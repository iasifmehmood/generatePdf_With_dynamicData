const { getdataFromDb } = require('../model/dataModel');
const fs = require('fs');
const pop = require('puppeteer');
const path = require('path');
const { default: puppeteer } = require('puppeteer');
exports.loadPdf = async (req, res) => {
  try {
    res.sendFile('pdf.html', { root: './views/' });
  } catch (error) {
    console.log(error);
  }
};

exports.generatePdf = async (req, res) => {
  try {
    const browser = await pop.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:4000/api/loadPdf', {
      waitUntil: 'networkidle2',
    });

    // `${req.protocol}://${req.get('host')`+ "/loadPdf`}`
    await page.setViewport({ width: 1680, height: 1050 });

    const todayDate = new Date();
    const pdfn = await page.pdf({
      path: `${path.join(__dirname, '../files', todayDate.getTime() + '.pdf')}`,
      format: 'A4',
    });

    await browser.close();

    const pdfURL = path.join(
      __dirname,
      '../files',
      todayDate.getTime() + '.pdf'
    );

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': pdfn.length,
    });

    res.sendFile(pdfURL);
  } catch (error) {
    console.log(error);
  }
};
// exports.generatePdf = async (req, res) => {
//   try {
//     let html = fs.readFileSync('./views/pdf.html', 'utf-8');

//     let data = {
//       '{{NAME}}': 'asif',
//       '{{CONTACT}}': '4545',
//       '{{EMAIL}}': 'goog@gmail.com',
//     };
//     html = html.replace(/{{NAME}} | {{CONTACT}} | {{EMAIL}}/gi, matched => {
//       return data[matched];
//     });

//     let options = {
//       format: 'Letter',
//     };

//     pdf.create(html, options).toFile('./data.pdf', (err, resp) => {
//       if (err) return console.log(err);

//       console.log(resp);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
