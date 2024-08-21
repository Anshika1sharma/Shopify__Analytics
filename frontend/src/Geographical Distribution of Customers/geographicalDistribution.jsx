import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


const cities = [
    { city: 'Stockton', customerCount: 13, lat: 37.9577, lng: -121.2908 },
    { city: 'El Paso', customerCount: 13, lat: 31.7619, lng: -106.4850 },
    { city: 'Plano', customerCount: 13, lat: 33.0198, lng: -96.6989 },
    { city: 'Las Vegas', customerCount: 11, lat: 36.1699, lng: -115.1398 },
    { city: 'Seattle', customerCount: 11, lat: 47.6062, lng: -122.3321 },
    { city: 'Kansas City', customerCount: 11, lat: 39.0997, lng: -94.5786 },
    { city: 'Washington', customerCount: 11, lat: 38.9072, lng: -77.0369 },
    { city: 'Oakland', customerCount: 11, lat: 37.8044, lng: -122.2711 },
    { city: 'St. Paul', customerCount: 11, lat: 44.9537, lng: -93.0900 },
    { city: 'San Antonio', customerCount: 11, lat: 29.4241, lng: -98.4936 },
    { city: 'Hialeah', customerCount: 10, lat: 25.8576, lng: -80.2781 },
    { city: 'Dallas', customerCount: 10, lat: 32.7767, lng: -96.7970 },
    { city: 'Houston', customerCount: 10, lat: 29.7604, lng: -95.3698 },
    { city: 'Wichita', customerCount: 10, lat: 37.6872, lng: -97.3301 },
    { city: 'Austin', customerCount: 9, lat: 30.2672, lng: -97.7431 },
    { city: 'Boston', customerCount: 9, lat: 42.3601, lng: -71.0589 },
    { city: 'Laredo', customerCount: 9, lat: 27.5306, lng: -99.4803 },
    { city: 'Cincinnati', customerCount: 9, lat: 39.1031, lng: -84.5120 },
    { city: 'San Jose', customerCount: 9, lat: 37.3382, lng: -121.8863 },
    { city: 'Colorado Springs', customerCount: 8, lat: 38.8339, lng: -104.8214 },
    { city: 'Jacksonville', customerCount: 8, lat: 30.3322, lng: -81.6557 },
    { city: 'Aurora', customerCount: 8, lat: 39.7294, lng: -104.8319 },
    { city: 'Fort Worth', customerCount: 8, lat: 32.7555, lng: -97.3308 },
    { city: 'Detroit', customerCount: 8, lat: 42.3314, lng: -83.0458 },
    { city: 'Henderson', customerCount: 8, lat: 36.0395, lng: -114.9817 },
    { city: 'San Francisco', customerCount: 8, lat: 37.7749, lng: -122.4194 },
    { city: 'Chula Vista', customerCount: 8, lat: 32.6401, lng: -117.0842 },
    { city: 'Lexington', customerCount: 7, lat: 38.0406, lng: -84.5037 },
    { city: 'Tucson', customerCount: 7, lat: 32.2226, lng: -110.9747 },
    { city: 'Santa Ana', customerCount: 7, lat: 33.7455, lng: -117.8677 },
    { city: 'Chicago', customerCount: 7, lat: 41.8781, lng: -87.6298 },
    { city: 'Los Angeles', customerCount: 7, lat: 34.0522, lng: -118.2437 },
    { city: 'Columbus', customerCount: 7, lat: 39.9612, lng: -82.9988 },
    { city: 'Toledo', customerCount: 7, lat: 41.6528, lng: -83.5379 },
    { city: 'Corpus Christi', customerCount: 7, lat: 27.8006, lng: -97.3964 },
    { city: 'Memphis', customerCount: 7, lat: 35.1495, lng: -90.0490 },
    { city: 'Jersey City', customerCount: 7, lat: 40.7178, lng: -74.0431 },
    { city: 'Denver', customerCount: 7, lat: 39.7392, lng: -104.9903 },
    { city: 'Greensboro', customerCount: 6, lat: 36.0726, lng: -79.7910 },
    { city: 'Minneapolis', customerCount: 6, lat: 44.9778, lng: -93.2650 },
    { city: 'Bakersfield', customerCount: 6, lat: 35.3733, lng: -119.0187 },
    { city: 'Tulsa', customerCount: 6, lat: 36.1540, lng: -95.9928 },
    { city: 'Atlanta', customerCount: 6, lat: 33.7490, lng: -84.3880 },
    { city: 'Buffalo', customerCount: 6, lat: 42.8864, lng: -78.8784 },
    { city: 'Newark', customerCount: 6, lat: 40.7357, lng: -74.1724 },
    { city: 'Gilbert', customerCount: 6, lat: 33.3528, lng: -111.7890 },
    { city: 'Riverside', customerCount: 6, lat: 33.9806, lng: -117.3755 },
    { city: 'Honolulu', customerCount: 5, lat: 21.3069, lng: -157.8583 },
    { city: 'St. Louis', customerCount: 5, lat: 38.6270, lng: -90.1994 },
    { city: 'Oklahoma City', customerCount: 5, lat: 35.4676, lng: -97.5164 },
    { city: 'Garland', customerCount: 5, lat: 32.9126, lng: -96.6389 },
    { city: 'St. Petersburg', customerCount: 5, lat: 27.7676, lng: -82.6403 },
    { city: 'Orlando', customerCount: 5, lat: 28.5383, lng: -81.3792 },
    { city: 'Nashville', customerCount: 5, lat: 36.1627, lng: -86.7816 },
    { city: 'New York', customerCount: 5, lat: 40.7128, lng: -74.0060 },
    { city: 'Chattanooga', customerCount: 5, lat: 35.0456, lng: -85.3097 },
    { city: 'San Diego', customerCount: 5, lat: 32.7157, lng: -117.1611 },
    { city: 'Baltimore', customerCount: 5, lat: 39.2904, lng: -76.6122 },
    { city: 'Glendale', customerCount: 4, lat: 34.1425, lng: -118.2551 },
    { city: 'Philadelphia', customerCount: 4, lat: 39.9526, lng: -75.1652 },
    { city: 'Phoenix', customerCount: 4, lat: 33.4484, lng: -112.0740 },
    { city: 'Portland', customerCount: 4, lat: 45.5152, lng: -122.6784 },
    { city: 'Charlotte', customerCount: 4, lat: 35.2271, lng: -80.8431 },
    { city: 'Tampa', customerCount: 4, lat: 27.9506, lng: -82.4572 },
    { city: 'Anaheim', customerCount: 3, lat: 33.8366, lng: -117.9143 },
    { city: 'Fort Wayne', customerCount: 3, lat: 41.0793, lng: -85.1394 },
    { city: 'Arlington', customerCount: 3, lat: 32.7357, lng: -97.1081 },
    { city: 'Indianapolis', customerCount: 3, lat: 39.7684, lng: -86.1581 },
    { city: 'Sacramento', customerCount: 3, lat: 38.5816, lng: -121.4944 },
    { city: 'Mesa', customerCount: 3, lat: 33.4152, lng: -111.8315 },
    { city: 'Raleigh', customerCount: 3, lat: 35.7796, lng: -78.6382 },
    { city: 'Bridgeport', customerCount: 2, lat: 41.1865, lng: -73.1952 },
    { city: 'Durham', customerCount: 2, lat: 35.9940, lng: -78.8986 },
    { city: 'Omaha', customerCount: 2, lat: 41.2565, lng: -95.9345 },
    { city: 'San Bernardino', customerCount: 2, lat: 34.1083, lng: -117.2898 },
    { city: 'Louisville', customerCount: 2, lat: 38.2527, lng: -85.7585 },
    { city: 'Madison', customerCount: 2, lat: 43.0731, lng: -89.4012 },
    { city: 'Cleveland', customerCount: 2, lat: 41.4993, lng: -81.6944 },
    { city: 'Reno', customerCount: 2, lat: 39.5296, lng: -119.8138 },
    { city: 'Spokane', customerCount: 2, lat: 47.6588, lng: -117.4260 },
    { city: 'Pittsburgh', customerCount: 2, lat: 40.4406, lng: -79.9959 },
    { city: 'Louisville', customerCount: 2, lat: 38.2527, lng: -85.7585 },
    { city: 'Chandler', customerCount: 1, lat: 33.3062, lng: -111.8413 },
    { city: 'Anchorage', customerCount: 1, lat: 61.2181, lng: -149.9003 },
    { city: 'Lubbock', customerCount: 1, lat: 33.5779, lng: -101.8552 },
    { city: 'Glendale', customerCount: 1, lat: 33.5387, lng: -112.1859 },
    { city: 'Richmond', customerCount: 1, lat: 37.5407, lng: -77.4360 },
    { city: 'Irving', customerCount: 1, lat: 32.8140, lng: -96.9489 },
    { city: 'Santa Clarita', customerCount: 1, lat: 34.3917, lng: -118.5426 },
    { city: 'Boise', customerCount: 1, lat: 43.6150, lng: -116.2023 },
    { city: 'Lubbock', customerCount: 1, lat: 33.5779, lng: -101.8552 },
    { city: 'Hialeah', customerCount: 1, lat: 25.8576, lng: -80.2781 },
    { city: 'Worcester', customerCount: 1, lat: 42.2626, lng: -71.8023 },
    { city: 'Baton Rouge', customerCount: 1, lat: 30.4515, lng: -91.1871 },
    { city: 'Long Beach', customerCount: 1, lat: 33.7701, lng: -118.1937 },
    { city: 'Fresno', customerCount: 1, lat: 36.7378, lng: -119.7871 },
    { city: 'Scottsdale', customerCount: 1, lat: 33.4942, lng: -111.9261 }
];

const MapComponent = () => {
    const mapRef = React.useRef();

    React.useEffect(() => {
        const map = mapRef.current;
        if (map != null) {
            const bounds = L.latLngBounds(cities.map(city => [city.lat, city.lng]));
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, []);

    return (
        <div className="map-container">
            <h2 className="map-heading">Geographical Distribution of Customers</h2>
            <MapContainer
                center={[37.7749, -122.4194]}
                zoom={4}
                style={{ height: '600px', width: '100%' }}
                whenCreated={mapInstance => { mapRef.current = mapInstance }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {cities.map((city, index) => (
                    <Marker key={index} position={[city.lat, city.lng]}>
                        <Popup>
                            <strong>{city.city}</strong><br />
                            Customers: {city.customerCount}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            <style jsx>{`
                .map-container {
                    margin: 0 auto;
                    padding: 20px;
                    border: 2px solid #ddd;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    background-color: #f9f9f9;
                    text-align: center; /* Center align the heading */
                }
                .map-heading {
                    margin-bottom: 20px; /* Space between heading and map */
                    font-size: 24px;
                    color: #333;
                }
                .leaflet-container {
                    border-radius: 10px;
                }
                .leaflet-popup-content {
                    font-weight: bold;
                }
            `}</style>
        </div>
    );
};

export default MapComponent;