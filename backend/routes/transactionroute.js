import express from "express"
const router = express.Router();
import multer from "multer"
import uploadCSV from "../controller/transactioncontroller.js"

const upload = multer({ dest: 'uploads/' });
router.post('/upload', upload.single('csvFile'), uploadCSV);

const transactionroute = router;
export default transactionroute;