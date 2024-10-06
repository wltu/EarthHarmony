// Imports
const express = require('express')
const app = express()
const port = 8000

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))
app.use('/img', express.static(__dirname + '/img'))

// Set Views
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
    res.render('index', { text: 'This is EJS'})
})


//  Listen on port 8000
app.listen(port, () => console.info(`Listening on port ${port}`))