import express from "express"
import cors from "cors"
import helmet from "helmet"
import { rateLimit } from "express-rate-limit"
import swaggerUi from "swagger-ui-express"
import swaggerJsdoc from "swagger-jsdoc"

const app = express()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 50,
    standardHeaders: "draft-8",
    legacyHeaders: false,
})

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Rabbitt AI API",
            version: "1.0.0",
            description: "Upload sales data → AI summary → Email delivery",
        },
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "x-api-key",
                },
            },
        },
    },
    apis: ["./src/routes/*.js"],
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

app.use(helmet())
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(limiter)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))


import uploadRouter from "./routes/upload.routes.js"

app.use("/api/v1/upload", uploadRouter)

app.get("/healthz", (req, res) => {
    res.status(200).json({ status: "OK" })
})

export { app }
