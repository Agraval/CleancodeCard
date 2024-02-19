const express = require('express');
const cardRoutes = require('./routes/cardRoutes');

const app = express();
app.use(express.json());

app.use('/api/cards', cardRoutes);

const port = process.env.PORT || 8181;
app.listen(port, () => console.log(`Server is listening on port ${port}`));

module.exports = app;
