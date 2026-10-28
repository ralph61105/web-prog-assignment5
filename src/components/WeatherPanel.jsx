import WeatherDetails from './WeatherDetails.jsx';
import { getCondition } from '../utils/conditions.js';

function WeatherPanel({ place, current }) {
    const condition = getCondition(current.weather_code, current.is_day);
    const region = place.admin1 ? `${place.admin1}, ${place.country || ''}` : place.country || '';

    return (
        <section className="weather-panel" aria-label="Current weather">
            <div className="weather-heading">
                <div>
                    <p className="small-title">CURRENT CONDITIONS</p>
                    <h2 className="city-name">{place.name}</h2>
                    <p className="location">{region}</p>
                </div>
                <span className="weather-icon" role="img" aria-label={condition.text}>
                    {condition.icon}
                </span>
            </div>
            <div className="temperature-block">
                <p className="temperature">{Math.round(current.temperature_2m)} °C</p>
                <p className="description">{condition.text}</p>
            </div>
            <WeatherDetails current={current} />
        </section>
    );
}

export default WeatherPanel;
