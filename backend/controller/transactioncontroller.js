import csv from "csv-parser";
import fs from "fs";
import transaction from "../models/transaction.js";

// Category detection rules (define at the top)
const detectCategory = (description) => {
  if (!description) return "Uncategorized";
  
  const desc = description.toLowerCase();
  
  // Rules for expenses (DEBIT)
  if (desc.includes("zomato") || desc.includes("restaurant") || desc.includes("food")) 
    return "Food & Dining";
  if (desc.includes("uber") || desc.includes("taxi") || desc.includes("fuel")) 
    return "Transportation";
  if (desc.includes("amazon") || desc.includes("shopping") || desc.includes("store")) 
    return "Shopping";
  if (desc.includes("rent") || desc.includes("recharge") || desc.includes("electricity")) 
    return "Bills";
  
  // Rules for income (CREDIT)
  if (desc.includes("salary") || desc.includes("payroll")) 
    return "Salary";
  if (desc.includes("freelance") || desc.includes("client")) 
    return "Freelance Income";
  
  return "Other"; // Default category
};

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

                // Auto-detect category based on transaction details
                const category = detectCategory(Details);

                results.push({
                    userId,
                    formattedDate: parsedDate,
                    Details: Details || '',
                    Type: Type || 'Other',
                    Amount: parsedAmount,
                    category // Add the auto-detected category
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
                    message: `${results.length} transactions uploaded successfully!`,
                    categoriesUsed: [...new Set(results.map(t => t.category))] // Show which categories were assigned
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

export default uploadCSV;