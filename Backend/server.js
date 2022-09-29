const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const path = require('path');
const housesRouter = require('./routes/houses');


// Code convention: production port is on 3000
const PORT = 3000;
// For parsing request body stream as one js obj
app.use(cors({
  options: '*'
}));
app.use(express.json());
// app.use('*', (req, res)=>{
//   console.log(req);
//   return res.status(200);
// })
// const holler = (request, response, next) => {

//   console.log("\n \nHoller! We're in the router you're testing!");
//   console.log('request body is...', request.body)
//   console.log('response locals is...', response.locals)
//   console.log('\n\n')
//   return next();
// }



// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../dist/build')));

// Respond with index.html for inital webpage
// If index.html is in same folder as css VV
// app.use('/', express.static(path.join(__dirname, '../dist/build')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});
app.get('/Frontend/Styles/styles.css', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../Frontend/Styles/styles.css'));
});

app.use('/houses', housesRouter);


// Unknown route handler, if a request is sent to a url that doesn't exist this sends a 404
app.use((req, res) => res.sendStatus(404));

// Global error handler, will trigger if any errors occur when handling requests
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Error occured during middleware execution',
      status: 400,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});
// Starts server listening on port 
app.listen(PORT, () => console.log(`Server started. Listening on PORT: ${PORT}`));