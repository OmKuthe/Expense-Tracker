import express from "express";
import multer from "multer";
import uploadCSV from "../controller/transactioncontroller.js";
import transaction from "../models/transaction.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Route to fetch transactions
router.get("/", async (req, res) => {
  try {
    const trans = await transaction.find().sort({ date: -1 });
    res.status(200).send(trans);
  } catch (err) {
    console.log(err);
    res.status(401).send("Error while getting transactions");
  }
});

// Route to upload CSV
router.post("/upload", upload.single("csvFile"), uploadCSV);

const dashboard = router;
export default dashboard;
