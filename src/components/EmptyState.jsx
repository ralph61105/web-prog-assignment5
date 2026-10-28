function EmptyState() {
    return (
        <section className="empty-panel" aria-label="Getting started">
            <span className="empty-icon" aria-hidden="true">☁️</span>
            <h2>What's the weather like?</h2>
            <p>Search for a city to see its temperature, sky conditions, and a few useful details.</p>
        </section>
    );
}

export default EmptyState;
