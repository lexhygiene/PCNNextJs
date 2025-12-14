const https = require('https');

const data = JSON.stringify({
    mutations: []
});

const options = {
    hostname: 'sfezutix.api.sanity.io',
    path: '/v2021-06-07/data/mutate/production',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(data);
req.end();
