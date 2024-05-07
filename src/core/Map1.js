import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip } from 'react-leaflet';
import L from 'leaflet'; // Import leaflet library
import 'leaflet/dist/leaflet.css';
import axios from 'axios'; // Import axios library
import iconImage from './th (2).jpg'; // Import the local image file

// Define the custom icon for the pin marker
const customIcon = L.icon({
  iconUrl: iconImage, // Use the local image file as icon
  iconSize: [32, 32],
  iconAnchor: [8, 8],
});

const locations = {
  p1: ["p1", [12.845403, 77.663211]],
  p2: ["p2", [12.845378, 77.662713]],
  p3: ["p3", [12.845054, 77.662687]],
  p4: ["p4", [12.844885, 77.662690]],
  p5: ["p5", [12.844875546679772, 77.66243298219361]],
  p6: ["p6", [12.844199, 77.662433]],
  p7: ["p7", [12.844080, 77.662858]],
  p8: ["p8", [12.843593, 77.662676]],
  p9: ["p9", [12.843240, 77.663470]],
  p10: ["p10", [12.843672, 77.663658]],
  p11: ["p11", [12.843785, 77.663293]],
  p12: ["p12", [12.843855, 77.663158]],
  p13: ["p13", [12.843950, 77.663302]],
  p14: ["p14", [12.844581, 77.663379]],
  p15: ["p15", [12.844123, 77.663842]],
  p16: ["p16", [12.844130, 77.664261]],
  p17: ["p17", [12.844931, 77.664245]],
  p18: ["p18", [12.845029, 77.663798]],
  p19: ["p19", [12.845045, 77.663185]],
  MG: ["MG", [12.845407, 77.663799]],
  IC: ["IC", [12.844614, 77.662680]],
  Recep: ["Recep", [12.844810544235095, 77.66316521297155]],
  FIG: ["FIG", [12.845168263868324, 77.66316000401639]],
  FG: ["FG", [12.845184, 77.663984]],
  Ram: ["Ram", [12.844585, 77.663767]],
  TC: ["TC", [12.844403, 77.663484]],
  Gym: ["Gym", [12.843733002476245, 77.66308593181043]],
  Mess: ["Mess", [12.843437794853076, 77.66333069400783]],
  Exit: ["Exit", [12.843367225974232, 77.66358402305961]],
  current: ["current", [0, 0]], // Placeholder for current location
};

// const findNearestVertex = (currentPosition) => {
//   let nearestVertex = null;
//   let shortestDistance = Infinity;

//   for (const [key, [name, position]] of Object.entries(locations)) {
//     const distance = Math.sqrt(
//       Math.pow(position[0] - currentPosition[0], 2) +
//       Math.pow(position[1] - currentPosition[1], 2)
//     );

//     if (distance < shortestDistance) {
//       shortestDistance = distance;
//       nearestVertex = key;
//     }
//   }
//   console.log(nearestVertex)
//   return nearestVertex;
// };

const Map1 = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [mapVisible, setMapVisible] = useState(false);
  const [path, setPath] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let start = params.get('start');
  const end = params.get('end');
  const algorithm = params.get('algorithm')

  // Fetch user location when the component mounts
  useEffect(() => {
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
          setMapVisible(true); // Set map visibility to true after setting user location
        },
        (error) => {
          console.error('Error getting user location:', error);
          // For demonstration purposes, setting a default location (p1)
          setUserPosition(locations.p1[1]);
          setMapVisible(true); // Set map visibility to true after setting default location
        }
      );
    };

    // Fetch user location only if start is 'current'
    if (start === 'current') {
      getUserLocation();
    }
    else{
      setUserPosition(locations[start][1]);
    }
    
  }, [start]);

  // Fetch path when start, end, or userPosition changes
  useEffect(() => {
    if (start && end && userPosition) {
      let apiUrl = '';
      if (algorithm === 'dijkstra') {
        apiUrl = `http://192.168.49.2:31976/shortest-path?start=${start}&end=${end}`;
      } else if (algorithm === 'bellmanford') {
        apiUrl = `http://192.168.49.2:31738/shortest-path?start=${start}&end=${end}`;
      } else if (algorithm === 'astar') {
        apiUrl = `http://192.168.49.2:31363/shortest-path?start=${start}&end=${end}`;
      }

      if (apiUrl) {
        axios.get(apiUrl)
          .then(response => {
            setPath(response.data.path);
            setMapVisible(true);
          })
          .catch(error => {
            console.error('Error fetching path:', error);
          });
      }
    }
  }, [start, end, userPosition, algorithm]);

  return (
    <>
      <br />
      <br/>
      {mapVisible && (
        <MapContainer
          center={userPosition || locations.p1[1]}
          zoom={25}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Add Marker with custom icon at the user's current position */}
          {userPosition && (
            <Marker position={userPosition} icon={customIcon}>
              <Popup>You are here</Popup>
            </Marker>
          )}
          {/* Iterate over path and add Markers */}
          {path.map((point, index) => (
            <Marker key={index} position={locations[point][1]} icon={customIcon}>
              <Popup>{locations[point][0]}</Popup>
              {/* Show the name of the location as Tooltip */}
              <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent>
                <span>{locations[point][0]}</span>
              </Tooltip>
            </Marker>
          ))}
          {/* Draw polyline between the points */}
          <Polyline positions={path.map(point => locations[point][1])} color="blue" />
        </MapContainer>
      )}
    </>
  );
};

export default Map1;
