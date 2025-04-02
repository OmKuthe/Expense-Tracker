import csv from "csv-parser";
import fs from "fs";
import transaction from "../models/transaction.js";

const uploadCSV = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    if (req.file.mimetype !== 'text/csv') {
        return res.status(400).json({ error: 'Only CSV files are allowed' });
    }

    const results = [];
    const userId = req.user.id;

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (row) => {
            try {
                const { formattedDate, Details, Type, Amount } = row;
            
                const parsedDate = isNaN(new Date(formattedDate)) 
                    ? new Date() 
                    : new Date(formattedDate);
                
                const parsedAmount = isNaN(parseFloat(Amount)) 
                    ? 0 
                    : parseFloat(Amount);

                results.push({
                    userId,
                    formattedDate: parsedDate,
                    Details: Details || '',
                    Type: Type || 'Other',
                    Amount: parsedAmount
                });
            } catch (rowError) {
                console.error('Error processing row:', rowError);
            }
        })
        .on('error', (error) => {
            fs.unlink(req.file.path, () => {});
            res.status(500).json({ error: 'Error processing CSV file' });
        })
        .on('end', async () => {
            try {
                if (results.length === 0) {
                    throw new Error('No valid transactions found');
                }
                
                await transaction.insertMany(results);
           
                fs.unlink(req.file.path, (err) => {
                    if (err) console.error('Error deleting file:', err);
                });
                
                res.status(201).json({ 
                    message: `${results.length} transactions uploaded successfully!` 
                });
            } catch (error) {
                fs.unlink(req.file.path, () => {});
                console.error('Database error:', error);
                res.status(500).json({ 
                    error: 'Failed to upload transactions',
                    details: error.message 
                });
            }
        });
};
export default uploadCSV