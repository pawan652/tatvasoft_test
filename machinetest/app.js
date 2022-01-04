const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { routes } = require('./route/routes');
const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use(function (req, res) {
//     res.setHeader('Content-Type', 'text/plain')
//     res.write('you posted:\n')
//     res.end(JSON.stringify(req.body, null, 2))
//   })

app.use(cors())
app.use('/api', routes)

app.get('/', function(req, res){
    console.log("Node is running");
})

app.listen(8000, function(){
    console.log("Node is running on port 8000");
})