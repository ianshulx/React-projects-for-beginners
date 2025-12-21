import multer from "multer";
import fs from "fs";

const uploadDir = process.env.UPLOAD_DIR || (process.env.NODE_ENV === 'production' ? "/tmp" : "./public");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

export default upload;

