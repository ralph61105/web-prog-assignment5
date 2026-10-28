import SearchForm from './SearchForm.jsx';
import StatusMessage from './StatusMessage.jsx';

function SearchPanel({ isLoading, status, message, onSearch }) {
    return (
        <section className="search-panel" aria-label="City search">
            <h2>Find your city</h2>
            <p className="search-intro">Enter a place to check its weather right now.</p>
            <SearchForm isLoading={isLoading} onSearch={onSearch} />
            <StatusMessage status={status} message={message} />
            <p className="units-note">Temperature in °C · Wind in km/h</p>
        </section>
    );
}

export default SearchPanel;
