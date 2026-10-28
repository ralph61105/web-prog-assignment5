import { useEffect, useState } from 'react';
import PageHeader from './components/PageHeader.jsx';
import SearchPanel from './components/SearchPanel.jsx';
import EmptyState from './components/EmptyState.jsx';
import LoadingPanel from './components/LoadingPanel.jsx';
import WeatherPanel from './components/WeatherPanel.jsx';
import Footer from './components/Footer.jsx';
import { loadWeather } from './api/openMeteo.js';

function App() {
    // Each search gets a new id, so searching the same city again (to retry) still fetches.
    const [search, setSearch] = useState(null);
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('Ready when you are.');
    const [weather, setWeather] = useState(null);

    function handleSearch(city) {
        if (!city) {
            setStatus('error');
            setMessage('Please enter a city name.');
            return;
        }
        setStatus('loading');
        setMessage(`Loading weather for ${city}...`);
        setSearch((previous) => ({ city, id: (previous?.id ?? 0) + 1 }));
    }

    // Fetch the weather whenever a new search is made.
    useEffect(() => {
        if (!search) return;

        // If another search starts before this one answers, its result is ignored.
        let ignore = false;

        loadWeather(search.city)
            .then((data) => {
                if (ignore) return;
                setWeather(data);
                setStatus('success');
                setMessage(`Current weather for ${data.place.name}.`);
            })
            .catch((error) => {
                if (ignore) return;
                setStatus('error');
                setMessage(error.message);
            });

        return () => {
            ignore = true;
        };
    }, [search]);

    // Show the city in the browser tab once its weather is on screen.
    useEffect(() => {
        document.title = status === 'success' ? `${weather.place.name} · City Weather` : 'City Weather';
    }, [status, weather]);

    return (
        <>
            <PageHeader />

            <main className="dashboard">
                <SearchPanel
                    isLoading={status === 'loading'}
                    status={status}
                    message={message}
                    onSearch={handleSearch}
                />

                {status === 'loading' && <LoadingPanel />}
                {status === 'success' && <WeatherPanel place={weather.place} current={weather.current} />}
                {(status === 'idle' || status === 'error') && <EmptyState />}
            </main>

            <Footer />
        </>
    );
}

export default App;
