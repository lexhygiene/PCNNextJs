const fs = require('fs');
const csv = require('csv-parser');
const { createClient } = require('next-sanity');

// --- CONFIGURATION ---
const config = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'sfezutix',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_WRITE_TOKEN || 'skXHWYYoM6xlVTbqjcnibf7fjjdDIqjUFa0QLhzZVPKhOTWmhHTY9aZIMcuiXU8FLf8sUwVuayMoVYcafueByXQGXF2zo8t7S3D1y3dLSOjqwFtKzhSRd1GtNKRiE9ZrqwoFwN2UaYF0RiI4pjUcs3BzC2BpQ7py3TP5ghbaJKcQlaty8Mtc',
    apiVersion: '2024-03-20',
    useCdn: false,
};

const client = createClient(config);
const CSV_FILE = 'pests.csv';

// Helper to create simple Portable Text block
function valToBlock(text) {
    if (!text) return undefined;
    return [
        {
            _type: 'block',
            markDefs: [],
            children: [{ _type: 'span', text: text }]
        }
    ];
}

const results = [];

fs.createReadStream(CSV_FILE)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
        console.log(`🚀 Starting pest enrichment for ${results.length} items...`);

        for (const row of results) {
            const commonName = row['Common Name']?.trim();
            if (!commonName) continue;

            const slugCurrent = commonName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            const scientificName = row['Scientific Name']?.trim();
            const dangerLevel = row['Danger Level']?.trim().toLowerCase(); // low, medium, high
            const seasonal = row['Seasonal Activity']?.split('|').map(s => s.trim());
            const imageUrl = row['Image URL']?.trim();

            const behavior = valToBlock(row['Behavior & Habitat']);
            const prevention = valToBlock(row['Prevention']);

            const doc = {
                _type: 'pest',
                commonName,
                slug: { _type: 'slug', current: slugCurrent },
                scientificName,
                dangerLevel,
                seasonalActivity: seasonal,
                mainImageExternalUrl: imageUrl,
                behavior,
                // habitat field is unused as requested (merged into behavior)
                prevention
            };

            try {
                // Try to find existing pest (either by slug or common name match)
                const query = `*[_type == "pest" && (slug.current == $slug || commonName == $name)][0]._id`;
                const existingId = await client.fetch(query, { slug: slugCurrent, name: commonName });

                if (existingId) {
                    // Update existing
                    await client.patch(existingId).set(doc).commit();
                    console.log(`✅ Updated: ${commonName}`);
                } else {
                    // Create new
                    await client.create(doc);
                    console.log(`✨ Created: ${commonName}`);
                }
            } catch (err) {
                console.error(`❌ Error processing ${commonName}:`, err.message);
            }
        }
        console.log('🏁 Pest import complete!');
    });
