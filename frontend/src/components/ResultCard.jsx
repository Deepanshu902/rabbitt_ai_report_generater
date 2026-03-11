import "../styles/ResultCard.css"

const formatLine = (text) => {
    return text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
}

const formatSummary = (text) => {
    return text
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line, i) => (
            <p
                key={i}
                className="summary-paragraph"
                dangerouslySetInnerHTML={{ __html: formatLine(line) }}
            />
        ))
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
                    <div className="summary-text">
                        {formatSummary(summary)}
                    </div>
                </div>
            )}

            {status === "error" && (
                <div className="error-body">{message}</div>
            )}
        </div>
    )
}

export default ResultCard