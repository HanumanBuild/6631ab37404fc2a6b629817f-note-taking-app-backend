const express = require('express');
const mongoose = require('mongoose');
const notesRouter = require('./routes/notes');
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_DBNAME });

app.use(express.json());
app.use('/api/notes', notesRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});