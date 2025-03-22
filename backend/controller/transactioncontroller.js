import csv from "csv-parser";
import fs from "fs"
import transaction from "../models/transaction.js"

const uploadCSV = async (req, res) => {
    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (row) => {
          const { formattedDate, Details, Type, Amount} = row;
          results.push({ 
              formattedDate: new Date(formattedDate), 
              Details: Details, 
              Type: Type, 
              Amount: parseFloat(Amount)
          });
      })
      .on('end', async () => {
          try {
              await transaction.insertMany(results);
              res.status(201).json({ message: 'Transactions uploaded successfully!' });
          } catch (error) {
              res.status(500).json({ error: 'Failed to upload transactions.' });
          }
      });
}
export default uploadCSV