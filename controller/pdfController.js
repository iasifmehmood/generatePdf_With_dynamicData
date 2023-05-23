const { getdataFromDb } = require('../model/dataModel');
const fs = require('fs');
const puppeteer = require('puppeteer');
const path = require('path');

const hbs = require('handlebars');

const fs_extra = require('fs-extra');

// const data = require('../data.json');

// const compile = async function (templateName, data) {
//   const filePath = path.join(process.cwd(), 'templates', `${templateName}.hbs`);

//   const html = await fs_extra.readFile(filePath, 'utf8');
//   return hbs.compile(html)(data);
// };

exports.loadPdf = async (req, res) => {
  try {
    res.sendFile('pdf.html', { root: './views/' });
  } catch (error) {
    console.log(error);
  }
};

exports.generatePdf = async (req, res) => {
  try {
    const rows = await getdataFromDb();
    const data = {
      title: 'User Data',
      users: rows,
    };
    console.log(data);

    const compile = async function (templateName, data) {
      const filePath = path.join(
        process.cwd(),
        'templates',
        `${templateName}.hbs`
      );

      const html = await fs_extra.readFile(filePath, 'utf8');
      return hbs.compile(html)(data);
    };

    const browser = await puppeteer.launch({
      headless: false,
    });

    const page = await browser.newPage();

    const content = await compile('index', data);

    await page.setContent(content);

    console.log('done creating pdf');

    // await page.goto('http://localhost:4000/api/loadPdf', {
    //   waitUntil: 'networkidle2',
    // });

    // `${req.protocol}://${req.get('host')`+ "/loadPdf`}`

    await page.setViewport({ width: 1080, height: 1024 });

    const todayDate = new Date();

    await page.pdf({
      path: `${path.join(__dirname, '../files', todayDate.getTime() + '.pdf')}`,
      printBackground: true,
      format: 'A4',
    });

    const pdfURL = path.join(
      __dirname,
      '../files',
      todayDate.getTime() + '.pdf'
    );

    res.download(pdfURL, err => {
      if (err) {
        console.log(err);
      }
    });

    // await browser.close();
  } catch (error) {
    console.log(error);
  }
};
