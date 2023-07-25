const express = require('express')
const path = require('path')
const app = express()
const postgres = require('postgres');
const port = 3000

require('dotenv').config();

app.use('/assets',express.static('static/'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/html/index.html'))
})

app.get('/api/get/projects', async (req, res) => {
    const response = await fetchProjects();
    const result = JSON.parse(JSON.stringify(response));
    var json = {};
    var count = 0;
    result.forEach((el) => {
        json = {...json, [count]: {
            "title": el['title'],
            "creationdate": el['timestamp'],
            "status": el['status'],
            "description": el['description'],
            "img_url": el['imgurl'],
            "project_url": el['projecturl'],
        }};
        count += 1;
    })
    res.json(json)
})

app.listen(port, () => {
    console.log(`Server is listening to ${port}`)
})

async function fetchProjects() {
    console.log(process.env.POSTGRES_URL)
    const sql = postgres(process.env.POSTGRES_URL);
    const data = await sql`
        SELECT * FROM projects;
    `;
    return data;
}