const express = require('express');
const app = express();
const path = require('path');

// Code convention: production port is on 3000
const PORT = 3000;
// For parsing request body stream as one js obj
app.use(express.json());
// TODO: Explain this in own words
// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../dist/build')));

// Respond with index.html for inital webpage
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});
// Unknown route handler
app.use((req, res) => res.sendStatus(404));

// Global error handler
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
app.listen(PORT, () => console.log(`Server started. Listening on PORT: ${PORT}`));