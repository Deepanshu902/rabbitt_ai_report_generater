import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { parseFile } from "../services/parser.service.js"
import { generateSummary } from "../services/llm.service.js"
import { sendEmail } from "../services/email.service.js"

const uploadAndProcess = asyncHandler(async (req, res) => {
    const file = req.file

    if (!file) {
        throw new ApiError(400, "No file uploaded")
    }

    const { email } = req.body

    const data = await parseFile(file)

    const summary = await generateSummary(data)

    await sendEmail(email, summary)

    return res
        .status(200)
        .json(new ApiResponse(200, { summary, sentTo: email }, "Summary generated"))
})

export { uploadAndProcess }
