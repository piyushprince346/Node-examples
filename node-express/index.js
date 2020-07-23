const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express() // our application is going to use express node module
app.use(morgan('dev'));
app.use(bodyParser.json());


// this will be done for all the /dishes path 
app.all('/dishes',(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next(); // it specifies that you have to look for further information 
})

//  for /dishes
app.get('/dishes',(req,res,next) => {
    res.end("Will send all the dishes to you!")
});

app.post('/dishes',(req,res,next) => {
    res.end("Will add the dish: " + req.body.name + " with the details: " + req.body.description);
})

// can't update whole dishes
app.put('/dishes', (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /dishes");
})

// Dangerous operation, must ensure who is to be provided with this privilege.
app.delete('/dishes', (req, res, next) => {
    res.end("Deleting all the dishes!");
});



// for /dishes/:dishid
app.get('/dishes/:dishId', (req, res, next) => {
    res.end("Will send details of the dish: " + req.params.dishId + " to you.");
});

// can't add dish within a specific dish
app.post('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /dishes/" + req.params.dishId);
})

app.put('/dishes/:dishId', (req, res, next) => {
    // res.write() helps used in adding a line to the reply message
    res.write("Updating the dish: " + req.params.dishId + '\n');
    res.end("Will update the dish: " + req.body.name + " with the details: " + req.body.description);
})


app.delete('/dishes/:dishId', (req, res, next) => {
    res.end("Deleting the dish: " + req.params.dishId);
});





app.use(express.static(__dirname + '/public'))

app.use((req,res,next) => {
    // console.log(req.headers); -> if we are using morgan then no need to write this 
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1> This is an Express Server </h1></body></html>');

})

const server = http.createServer(app);

server.listen(port,hostname,() => {
    console.log(`Server running at http://${hostname}:${port}`);
})