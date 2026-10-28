import { useState } from 'react';

function SearchForm({ isLoading, onSearch }) {
    const [city, setCity] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        if (isLoading) return;
        onSearch(city.trim());
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="city-input">City name</label>
            <input
                id="city-input"
                name="city"
                type="text"
                placeholder="Try Beirut or London"
                value={city}
                disabled={isLoading}
                onChange={(event) => setCity(event.target.value)}
            />
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Check weather'}
            </button>
        </form>
    );
}

export default SearchForm;
