const { createClient } = require('next-sanity');

const config = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'sfezutix',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_WRITE_TOKEN || 'skXHWYYoM6xlVTbqjcnibf7fjjdDIqjUFa0QLhzZVPKhOTWmhHTY9aZIMcuiXU8FLf8sUwVuayMoVYcafueByXQGXF2zo8t7S3D1y3dLSOjqwFtKzhSRd1GtNKRiE9ZrqwoFwN2UaYF0RiI4pjUcs3BzC2BpQ7py3TP5ghbaJKcQlaty8Mtc',
    apiVersion: '2024-03-20',
    useCdn: false,
};

const client = createClient(config);

async function run() {
    console.log('🧹 Starting cleanup of "behavior" field...');
    const pests = await client.fetch('*[_type == "pest"]{_id, commonName}');

    for (const pest of pests) {
        try {
            await client.patch(pest._id).unset(['behavior']).commit();
            console.log(`✅ Removed behavior from: ${pest.commonName}`);
        } catch (e) {
            console.error(`❌ Failed: ${pest.commonName}`, e.message);
        }
    }
    console.log('🏁 Cleanup complete!');
}

run();
