import { useState } from "react"
import axios from "axios"
import "../styles/UploadForm.css"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"
const API_KEY = import.meta.env.VITE_API_KEY

const UploadForm = ({ setStatus, setMessage, setSummary, status }) => {
    const [file, setFile] = useState(null)
    const [email, setEmail] = useState("")

    const handleFileChange = (e) => {
        const selected = e.target.files[0]
        if (selected) setFile(selected)
    }

    const handleSubmit = async () => {
        if (!file || !email) {
            setStatus("error")
            setMessage("Please provide both a file and an email.")
            return
        }

        const formData = new FormData()
        formData.append("file", file)
        formData.append("email", email)

        try {
            setStatus("loading")
            setMessage("")
            setSummary("")

            const res = await axios.post(`${API_URL}/api/v1/upload`, formData, {
                headers: {
                    "x-api-key": API_KEY,
                    "Content-Type": "multipart/form-data",
                },
            })

            setStatus("success")
            setMessage(res.data.message)
            setSummary(res.data.data.summary)
        } catch (err) {
            setStatus("error")
            setMessage(err.response?.data?.message || "Something went wrong.")
        }
    }

    return (
        <div className="form">

            <div className="field">
                <label className="label">Sales File</label>
                <div className={`drop-zone ${file ? "active" : ""}`}>
                    <input
                        type="file"
                        accept=".csv,.xlsx"
                        onChange={handleFileChange}
                    />
                    <svg className="drop-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    {file ? (
                        <span className="file-selected">{file.name}</span>
                    ) : (
                        <>
                            <span className="drop-primary">Click to upload</span>
                            <span className="drop-secondary">.csv or .xlsx, max 5MB</span>
                        </>
                    )}
                </div>
            </div>

            <div className="field">
                <label className="label">Recipient Email</label>
                <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                />
            </div>

            <div className="divider" />

            <button
                onClick={handleSubmit}
                disabled={status === "loading"}
                className="button"
            >
                {status === "loading" ? (
                    <>
                        <span className="spinner" />
                        Generating report...
                    </>
                ) : (
                    "Generate and Send Report"
                )}
            </button>

        </div>
    )
}

export default UploadForm
