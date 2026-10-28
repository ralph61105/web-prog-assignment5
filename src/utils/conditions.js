// Open-Meteo returns a weather code. Each code has a description and an icon.
const conditions = {
    0: { text: 'Clear sky', icon: '☀️' },
    1: { text: 'Mainly clear', icon: '🌤️' },
    2: { text: 'Partly cloudy', icon: '⛅' },
    3: { text: 'Overcast', icon: '☁️' },
    45: { text: 'Fog', icon: '🌫️' },
    48: { text: 'Freezing fog', icon: '🌫️' },
    51: { text: 'Light drizzle', icon: '🌦️' },
    53: { text: 'Moderate drizzle', icon: '🌦️' },
    55: { text: 'Heavy drizzle', icon: '🌦️' },
    56: { text: 'Light freezing drizzle', icon: '🌧️' },
    57: { text: 'Heavy freezing drizzle', icon: '🌧️' },
    61: { text: 'Light rain', icon: '🌧️' },
    63: { text: 'Moderate rain', icon: '🌧️' },
    65: { text: 'Heavy rain', icon: '🌧️' },
    66: { text: 'Light freezing rain', icon: '🌧️' },
    67: { text: 'Heavy freezing rain', icon: '🌧️' },
    71: { text: 'Light snow', icon: '🌨️' },
    73: { text: 'Moderate snow', icon: '🌨️' },
    75: { text: 'Heavy snow', icon: '🌨️' },
    77: { text: 'Snow grains', icon: '❄️' },
    80: { text: 'Light rain showers', icon: '🌦️' },
    81: { text: 'Moderate rain showers', icon: '🌦️' },
    82: { text: 'Heavy rain showers', icon: '🌧️' },
    85: { text: 'Light snow showers', icon: '🌨️' },
    86: { text: 'Heavy snow showers', icon: '🌨️' },
    95: { text: 'Thunderstorm', icon: '⛈️' },
    96: { text: 'Thunderstorm with light hail', icon: '⛈️' },
    97: { text: 'Heavy thunderstorm', icon: '⛈️' },
    99: { text: 'Thunderstorm with heavy hail', icon: '⛈️' }
};

export function getCondition(code, isDay) {
    const condition = conditions[code] || { text: 'Unknown conditions', icon: '🌡️' };

    // A clear night shows a moon instead of a sun.
    if (isDay === 0 && (code === 0 || code === 1)) {
        return { ...condition, icon: '🌙' };
    }
    return condition;
}
