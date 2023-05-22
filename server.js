const express = require('express');
const app = express();
const cors = require('cors');
const _ = require('dotenv').config();

const userRoutes = require('./route/pdfRoute.js');

/**********************POST API ************************** */
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', userRoutes);

// handling all unhandled routes
app.all('*', (req, _, next) => {
  next(new AppError(404, `Can't find ${req.originalUrl} on the server`));
});

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
