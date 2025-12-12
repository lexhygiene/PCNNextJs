const fs = require('fs');
const csv = require('csv-parser');
const { createClient } = require('next-sanity');

// --- CONFIGURATION ---
const config = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'sfezutix',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_WRITE_TOKEN,
    apiVersion: '2024-03-20',
    useCdn: false,
};

const client = createClient(config);
const CSV_FILE = 'service-areas.csv';

// --- HELPERS ---
async function findId(type, field, value) {
    if (!value) return null;
    const result = await client.fetch(`*[_type == $type && ${field} == $value][0]._id`, {
        type,
        value,
        field
    });
    return result;
}

// --- IMPORT LOGIC ---
const results = [];

fs.createReadStream(CSV_FILE)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
        console.log(`🚀 Starting import of ${results.length} areas from ${CSV_FILE}...`);

        for (const row of results) {
            const locationName = row['Location Name']?.trim();
            const slugCurrent = row['Slug']?.trim() || locationName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            const parentName = row['Parent Region']?.trim();
            const seoDescription = row['SEO Description']?.trim();
            const pestsString = row['Common Pests']?.trim(); // "Termites, Ants"

            if (!locationName) {
                console.warn('⚠️ Skipping row with missing Location Name');
                continue;
            }

            // 1. Resolve Parent (Create if missing)
            let parentRef = undefined;
            if (parentName) {
                let parentId = await client.fetch(`*[_type == "serviceArea" && locationName == $name][0]._id`, { name: parentName });

                if (!parentId) {
                    // Create new Parent Region
                    const parentSlug = parentName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                    try {
                        const newParent = await client.create({
                            _type: 'serviceArea',
                            locationName: parentName,
                            slug: { _type: 'slug', current: parentSlug },
                            // No parent for a parent region
                        });
                        parentId = newParent._id;
                        console.log(`🗺️ Created new Parent Region: "${parentName}"`);
                    } catch (err) {
                        console.error(`❌ Failed to create parent "${parentName}":`, err.message);
                    }
                }

                if (parentId) {
                    parentRef = { _type: 'reference', _ref: parentId };
                }
            }

            // 2. Resolve Pests (Create if missing)
            const pestRefs = [];
            if (pestsString) {
                const pestNames = pestsString.split(',').map(s => s.trim());
                for (const name of pestNames) {
                    // Check if exists
                    let pestId = await client.fetch(`*[_type == "pest" && commonName == $name][0]._id`, { name });

                    if (!pestId) {
                        // Create new pest
                        const newPestSlug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                        try {
                            const newPest = await client.create({
                                _type: 'pest',
                                commonName: name,
                                slug: { _type: 'slug', current: newPestSlug },
                                dangerLevel: 'Medium' // Default
                            });
                            pestId = newPest._id;
                            console.log(`🐛 Created new pest: "${name}"`);
                        } catch (err) {
                            console.error(`❌ Failed to create pest "${name}":`, err.message);
                        }
                    }

                    if (pestId) {
                        pestRefs.push({ _type: 'reference', _ref: pestId, _key: pestId });
                    }
                }
            }

            // 3. Build Document
            const doc = {
                _type: 'serviceArea',
                locationName: locationName,
                slug: { _type: 'slug', current: slugCurrent },
                seoDescription: seoDescription,
                parent: parentRef,
                commonPests: pestRefs.length > 0 ? pestRefs : undefined
            };

            // 4. Upsert
            try {
                const existing = await client.fetch(`*[_type == "serviceArea" && slug.current == $slug][0]._id`, { slug: slugCurrent });
                if (existing) {
                    await client.patch(existing).set(doc).commit();
                    console.log(`✅ Updated: ${locationName}`);
                } else {
                    await client.create(doc);
                    console.log(`✨ Created: ${locationName}`);
                }
            } catch (err) {
                console.error(`❌ Failed ${locationName}:`, err.message);
            }
        }
        console.log('🏁 Import complete!');
    });
