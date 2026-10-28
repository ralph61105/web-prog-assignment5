import DetailItem from './DetailItem.jsx';

function WeatherDetails({ current }) {
    return (
        <dl className="details">
            <DetailItem label="Feels like" value={`${Math.round(current.apparent_temperature)} °C`} />
            <DetailItem label="Humidity" value={`${current.relative_humidity_2m}%`} />
            <DetailItem label="Wind speed" value={`${current.wind_speed_10m} km/h`} />
        </dl>
    );
}

export default WeatherDetails;
