const express = require('express')
const path = require('path')
const req = require('express/lib/request')
const res = require('express/lib/response')
const app = express()
const port = 3000

app.use('/assets',express.static('static/'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/html/index.html'))
})

app.get('/api/get/projects', (req, res) => {
    res.json({
        "0": {
            "title": "My Website",
            "creationdate": 1689984000,
            "status": 0,
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "img_url": "https://github.com/Ufinator/webassets/blob/master/homepagebanner.png?raw=true",
            "project_url": "https://example.com/"
        },
        "1": {
            "title": "Example",
            "creationdate": 1648252800,
            "status": 1,
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "img_url": "https://github.com/Ufinator/webassets/blob/master/homepagebanner.png?raw=true",
            "project_url": "https://example.com/"
        }
    })
})

app.listen(port, () => {
    console.log(`Server is listening to ${port}`)
})