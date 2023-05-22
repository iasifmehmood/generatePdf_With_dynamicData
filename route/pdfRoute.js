const express = require('express');
const { loadPdf, generatePdf } = require('../controller/pdfController.js');
const userRouter = express.Router();

userRouter.get('/loadPdf', loadPdf);
userRouter.get('/generatePdf', generatePdf);
module.exports = userRouter;
