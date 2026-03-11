import { Router } from "express"
import { upload } from "../middleware/multer.middleware.js"
import { verifyApiKey, validateEmail } from "../middleware/security.middleware.js"
import { uploadAndProcess } from "../controller/upload.controller.js"

const router = Router()

/**
 * @swagger
 * /api/v1/upload:
 *   post:
 *     summary: Upload sales data and receive AI summary via email
 *     tags: [Sales Insight]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *               - email
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: CSV or XLSX sales data file (max 5MB)
 *               email:
 *                 type: string
 *                 description: Recipient email address
 *     responses:
 *       200:
 *         description: Summary generated and email sent successfully
 *       400:
 *         description: Bad request — invalid file or email
 *       401:
 *         description: Unauthorized — missing API key
 *       403:
 *         description: Forbidden — invalid API key
 *       500:
 *         description: Internal server error
 */

router.post("/", verifyApiKey, upload.single("file"), validateEmail, uploadAndProcess)

export default router
