import { ApiError } from "../utils/ApiError.js"

const verifyApiKey = (req, res, next) => {
    const apiKey = req.headers["x-api-key"]

    if (!apiKey) {
        return next(new ApiError(401, "Unauthorized — API key missing"))
    }

    if (apiKey !== process.env.API_SECRET_KEY) {
        return next(new ApiError(403, "Forbidden — Invalid API key"))
    }

    next()
}

const validateEmail = (req, res, next) => {
    const { email } = req.body

    if (!email) {
        return next(new ApiError(400, "Email is required"))
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return next(new ApiError(400, "Invalid email format"))
    }

    next()
}

export { verifyApiKey, validateEmail }