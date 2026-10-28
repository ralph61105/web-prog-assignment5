function LoadingPanel() {
    return (
        <section className="loading-panel" aria-label="Loading weather">
            <span className="loading-dot" aria-hidden="true"></span>
            <p>Checking the sky...</p>
        </section>
    );
}

export default LoadingPanel;
