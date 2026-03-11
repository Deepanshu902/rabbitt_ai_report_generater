import dotenv from "dotenv"
import { app } from "./src/app.js"

dotenv.config({
    path: "./.env",
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running at port : ${process.env.PORT || 5000}`)
    console.log(`Swagger docs at : http://localhost:${process.env.PORT || 5000}/api-docs`)
})
