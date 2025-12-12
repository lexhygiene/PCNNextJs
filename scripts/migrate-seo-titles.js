
const { createClient } = require('next-sanity');

// Reusing configuration from previous scripts
const config = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'sfezutix',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_WRITE_TOKEN,
    apiVersion: '2024-03-20',
    useCdn: false,
};

const client = createClient(config);

async function migrate() {
    console.log('🚀 Starting Bulk SEO Title Update...');

    // Fetch all service areas
    const areas = await client.fetch(`*[_type == "serviceArea"]{_id, locationName, seoTitle}`);
    console.log(`Found ${areas.length} service areas.`);

    let updatedCount = 0;

    for (const area of areas) {
        // Define default title
        // Example: "Pest Control Services in Noida Sector 18 | Pest Control Noida"
        const newTitle = `Pest Control Services in ${area.locationName} | Pest Control Noida`;

        // Update if missing or empty
        if (!area.seoTitle) {
            try {
                await client.patch(area._id).set({ seoTitle: newTitle }).commit();
                console.log(`✅ Updated: ${area.locationName} -> "${newTitle}"`);
                updatedCount++;
            } catch (err) {
                console.error(`❌ Failed to update ${area.locationName}:`, err.message);
            }
        } else {
            // console.log(`Skipping (already exists): ${area.locationName}`);
        }
    }

    console.log(`🏁 Migration complete. Updated ${updatedCount} documents.`);
}

migrate();
