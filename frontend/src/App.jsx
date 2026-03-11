import { useState } from "react"
import UploadForm from "./components/UploadForm"
import ResultCard from "./components/ResultCard"
import "./styles/App.css"

export default function App() {
    const [status, setStatus] = useState("idle")
    const [message, setMessage] = useState("")
    const [summary, setSummary] = useState("")

    return (
        <div className="app">
            <div className="container">

                <div className="header">
                    <div className="header-top">
                        <span className="logo-dot" />
                        <span className="logo-text">Rabbitt AI</span>
                    </div>
                    <h1>Sales Insight Automator</h1>
                    <p>Upload your sales data and receive an AI-generated executive summary delivered to your inbox.</p>
                </div>

                <div className="card">
                    <UploadForm
                        setStatus={setStatus}
                        setMessage={setMessage}
                        setSummary={setSummary}
                        status={status}
                    />
                    <ResultCard
                        status={status}
                        message={message}
                        summary={summary}
                    />
                </div>

                <div className="footer">
                    Powered by Rabbitt AI
                </div>

            </div>
        </div>
    )
}
