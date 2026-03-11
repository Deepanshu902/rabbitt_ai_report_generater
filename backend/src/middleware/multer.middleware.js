import multer from "multer"
import { ApiError } from "../utils/ApiError.js"

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    const allowed = [
        "text/csv",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
    ]

    if (!file) {
        return cb(new ApiError(400, "No file uploaded"), false)
    }

    if (!allowed.includes(file.mimetype)) {
        return cb(new ApiError(400, "Only .csv and .xlsx files are allowed"), false)
    }

    cb(null, true)
}

export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
})
