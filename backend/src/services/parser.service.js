import xlsx from "xlsx"
import { Readable } from "stream"
import csvParser from "csv-parser"
import { ApiError } from "../utils/ApiError.js"

const parseCSV = (buffer) => {
    return new Promise((resolve, reject) => {
        const results = []
        const stream = Readable.from(buffer.toString())

        stream
            .pipe(csvParser())
            .on("data", (row) => results.push(row))
            .on("end", () => resolve(results))
            .on("error", (err) => reject(err))
    })
}

const parseXLSX = (buffer) => {
    const workbook = xlsx.read(buffer, { type: "buffer" })
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    return xlsx.utils.sheet_to_json(sheet)
}

const parseFile = async (file) => {
    const { mimetype, buffer, originalname } = file

    let data

    if (mimetype === "text/csv" || originalname.endsWith(".csv")) {
        data = await parseCSV(buffer)
    } else {
        data = parseXLSX(buffer)
    }

    if (!data || data.length === 0) {
        throw new ApiError(400, "File is empty")
    }

    return data
}

export { parseFile }
