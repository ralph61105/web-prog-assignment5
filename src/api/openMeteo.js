const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

async function getJSON(url) {
    try {
        const response = await fetch(url);

        if (response.status === 429) {
            throw new Error('Too many requests. Wait a minute, then search again.');
        }
        if (!response.ok) {
            throw new Error(`The weather service could not complete the request (HTTP ${response.status}). Please try again later.`);
        }

        return await response.json();
    } catch (error) {
        if (error.name === 'TypeError') {
            throw new Error('Could not reach the weather service. Check your internet connection and search again.');
        }
        if (error.name === 'SyntaxError') {
            throw new Error('The weather service returned an unreadable response. Please try again later.');
        }
        throw error;
    }
}

// First request: find the city's coordinates. Second request: its current weather.
export async function loadWeather(city) {
    const cityParams = new URLSearchParams({ name: city, count: 1, language: 'en' });
    const places = await getJSON(`${GEO_URL}?${cityParams}`);

    if (!places.results?.length) {
        throw new Error('City not found. Check the spelling and search again.');
    }

    const place = places.results[0];
    const weatherParams = new URLSearchParams({
        latitude: place.latitude,
        longitude: place.longitude,
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day',
        temperature_unit: 'celsius',
        wind_speed_unit: 'kmh',
        timezone: 'auto'
    });
    const data = await getJSON(`${WEATHER_URL}?${weatherParams}`);

    // Avoid showing missing readings as zero or undefined.
    const readings = ['temperature_2m', 'relative_humidity_2m', 'apparent_temperature', 'weather_code', 'wind_speed_10m'];
    if (!data.current || readings.some((key) => typeof data.current[key] !== 'number')) {
        throw new Error('Some weather data is missing. Please try again later.');
    }

    return { place, current: data.current };
}
