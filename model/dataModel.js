const QueryDB = require('../config/db_Config');

exports.getdataFromDb = () => {
  return QueryDB('SELECT * from pdf_table');
};
