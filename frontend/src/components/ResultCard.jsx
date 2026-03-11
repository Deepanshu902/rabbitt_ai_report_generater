import "../styles/ResultCard.css"

const formatSummary = (text) => {
    return text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
}

const ResultCard = ({ status, message, summary }) => {
    if (status === "idle" || status === "loading") return null

    return (
        <div className={`result result-${status}`}>
            <div className="result-bar">
                <span className="status-dot" />
                <span className="status-label">
                    {status === "success" ? "Success" : "Error"}
                </span>
                <span className="status-msg">{message}</span>
            </div>

            {status === "success" && summary && (
                <div className="summary-body">
                    <p className="summary-label">AI Generated Summary</p>
                    <div
                        className="summary-text"
                        dangerouslySetInnerHTML={{ __html: formatSummary(summary) }}
                    />
                </div>
            )}

            {status === "error" && (
                <div className="error-body">{message}</div>
            )}
        </div>
    )
}

export default ResultCard
