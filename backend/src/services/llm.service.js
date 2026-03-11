import { GoogleGenerativeAI } from "@google/generative-ai"
import { ApiError } from "../utils/ApiError.js"

const generateSummary = async (data) => {
    if (!process.env.GEMINI_API_KEY) {
        throw new ApiError(500, "Gemini API key not configured")
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" })

    const prompt = `
        You are a professional business analyst at Rabbitt AI.
        Analyze the following sales data and generate a concise executive-level summary report.

        Include:
        - Overall performance highlights
        - Top performing regions and products
        - Revenue trends
        - 2-3 actionable recommendations

        Keep it professional, clear, and under 300 words.

        Sales Data:
        ${JSON.stringify(data, null, 2)}
    `

    const result = await model.generateContent(prompt)
    const response = await result.response

    return response.text()
}

export { generateSummary }