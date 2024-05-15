const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const git = require('simple-git/promise');
const app = express();
const PORT = process.env.PORT || 3000;

const services = {};

app.use(bodyParser.json());


app.post('/register', async (req, res) => {
    const { githubRepo } = req.body;
    // const githubRepo = 'https://github.com/aashishrawte1/virtuals.io.git';
    const serviceId = generateUniqueId();
    const serviceDirectory = `./services/${serviceId}`;

    try {
        await git().clone(githubRepo, serviceDirectory);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: 'Failed to clone GitHub repository' });
    }

    exec(`docker build -t ${serviceId} ${serviceDirectory}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: 'Failed to build Docker image' });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({ error: 'Failed to build Docker image' });
        }

        exec(`docker run -d -p ${PORT}:3000 -v ${serviceDirectory}:/app ${serviceId}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return res.status(500).json({ error: 'Failed to spin up Docker container' });
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return res.status(500).json({ error: 'Failed to spin up Docker container' });
            }
            const url = `http://random-name.openworld.io/${serviceId}`; // Generate unique URL
            services[serviceId] = { githubRepo, url };
            res.status(201).json({ url });
        });
    });
});

app.get('/services/:service_id', (req, res) => {
    const { service_id } = req.params;
    const service = services[service_id];
    if (!service) {
        return res.status(404).json({ error: 'Service not found' });
    }
    res.json({ service });
});

app.get('/:service_id', (req, res) => {
    const { service_id } = req.params;
    const service = services[service_id];
    if (!service) {
        return res.status(404).json({ error: 'Service not found' });
    }
    res.redirect(service.url);
});

function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
