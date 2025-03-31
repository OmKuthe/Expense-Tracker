import express from "express"
const router = express.Router();
import multer from "multer"
import uploadCSV from "../controller/transactioncontroller.js"
import authenticate from '../middleware/auth.js'

const upload = multer({ dest: 'uploads/' });
router.post('/upload',authenticate, upload.single('csvFile'), uploadCSV);

const transactionroute = router;
export default transactionroute;