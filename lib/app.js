const express = require('express');
const app = express();

app.use(express.json());


// app.use('/api/v1/RESOURCE', require('./routes/resource'));
app.use('/api/v1/create', require('./routes/create'));
app.use('/api/v1/hit', require('./routes/hit'));
app.use('/api/v1/sandbox', require('./routes/sandbox'));
app.use('/api/v1/spot', require('./routes/spot'));


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
