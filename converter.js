const fs = require("fs");
const pdf = require("pdf-parse");
const { parse } = require("json2csv");

function processPDFtoCSV(pdfPath, csvPath) {
  let dataBuffer = fs.readFileSync(pdfPath);

  pdf(dataBuffer)
    .then(function (data) {
      const tableData = parseTableData(data.text);
      const csvData = convertToCSV(tableData);

      fs.writeFileSync(csvPath, csvData);
      console.log(`CSV file has been created at ${csvPath}`);
    })
    .catch((err) => {
      console.error("Error processing PDF:", err);
    });
}

// todo
function parseTableData(text) {
  const lines = text;
  const tableData = [];

  console.log(lines);

  return tableData;
}

// todo
function convertToCSV(data) {
  try {
    const csv = parse(data, {
      fields: ["Agency", "Address and Contact", "Time and Requirements", "SPA"],
    });
    return csv;
  } catch (err) {
    console.error("Error converting to CSV:", err);
  }
}

processPDFtoCSV("./food.pdf", "output.csv");
