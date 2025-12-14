const { loadEnvConfig } = require('@next/env');

const projectDir = process.cwd();
const { combinedEnv } = loadEnvConfig(projectDir);

console.log('Project ID:', combinedEnv.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log('Dataset:', combinedEnv.NEXT_PUBLIC_SANITY_DATASET);
