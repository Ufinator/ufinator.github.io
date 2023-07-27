require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const colors = require('cli-color')
const postgres = require('postgres');
const msg = require('./scripts/messages');
const port = process.env.APP_PORT;
const host = process.env.APP_HOST;

app.use('/assets/',express.static('static/'))

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/html/index.html'))
    return msg.response('/', 200, res.socket.remoteAddress)
})

app.get('/api/get/projects/', async (req, res) => {
    msg.debugmsg('Fetching project data started.');
    const response = await fetchProjects();
    msg.debugmsg('Fetching project data ended.');
    if (response === 0) {
        res.status(500).json({'error': 1});
        return msg.response('/api/get/projects/', 500, req.socket.remoteAddress);
    };
    const result = JSON.parse(JSON.stringify(response));
    var json = {};
    var count = 0;
    msg.debugmsg('Packing all results into one for the script understandable result.')
    result.forEach((el) => {
        json = {...json, [count]: {
            "title": el['title'],
            "creationdate": el['timestamp'],
            "status": el['status'],
            "description": el['description'],
            "img_url": el['imgurl'],
            "project_url": el['projecturl'],
        }};
        msg.debugmsg(`Finishing adding project number ${count}`)
        count += 1;
    });
    res.status(200).json(json);
    return msg.response('/api/get/projects/', 200, req.socket.remoteAddress);
})

app.get('*', (req, res) => {
    res.status(404).send('404 Not Found');
    return msg.response(req.url, 404, req.socket.remoteAddress);
})

async function fetchProjects() {
    var data;
    const sql = postgres(process.env.POSTGRES_URL);
    try {
        msg.debugmsg('Asking for projectdata inside the following POSTGRES URL: ' + process.env.POSTGRES_URL);
        data = await sql`
            SELECT * FROM projects;
        `;
        msg.debugmsg('Received data from SQL Projects');
    } catch (exception) {
        msg.error('MYSQL ERROR: ' + exception);
        return 0;
    }
    return data;
}

var server = app.listen(port, host, () => {
    console.log()
    console.log(colors.bgBlue(`
    -----------------------------------------------------------------------------------
     /$$   /$$ /$$$$$$$$ /$$$$$$ /$$   /$$  /$$$$$$  /$$$$$$$$ /$$$$$$  /$$$$$$$ 
    | $$  | $$| $$_____/|_  $$_/| $$$ | $$ /$$__  $$|__  $$__//$$__  $$| $$__  $$
    | $$  | $$| $$        | $$  | $$$$| $$| $$  \\ $$   | $$  | $$  \\ $$| $$  \\ $$
    | $$  | $$| $$$$$     | $$  | $$ $$ $$| $$$$$$$$   | $$  | $$  | $$| $$$$$$$/
    | $$  | $$| $$__/     | $$  | $$  $$$$| $$__  $$   | $$  | $$  | $$| $$__  $$
    | $$  | $$| $$        | $$  | $$\\  $$$| $$  | $$   | $$  | $$  | $$| $$  \\ $$
    |  $$$$$$/| $$       /$$$$$$| $$ \\  $$| $$  | $$   | $$  |  $$$$$$/| $$  | $$
     \\______/ |__/      |______/|__/  \\__/|__/  |__/   |__/   \\______/ |__/  |__/
     
                        Made by Mateo Snjegotinac (a.k.a. Ufinator)
     -----------------------------------------------------------------------------------`));
    console.log(colors.greenBright(`Server is listening to http://${server.address().address}:${server.address().port}`));
    if (process.env.DEBUG === "1") {
        console.log(colors.redBright.bgWhiteBright.bold('DEBUG MODE HAS BEEN ENABLED'));
    };
})