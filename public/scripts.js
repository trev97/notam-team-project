document.addEventListener("DOMContentLoaded", () => {
    const selectElement = document.getElementById("options");
    const label1 = document.getElementById("label1");
    const label2 = document.getElementById("label2")
    const radiusInput = document.getElementById("radius")
    chooseLabels();
    selectElement.addEventListener("change", () => {
        chooseLabels()
    });

    function chooseLabels(){
        if(selectElement.value == "Dlocation" || selectElement.value == "ICAOlocation"){
            label1.textContent = "Enter Starting Location..."
            label2.textContent = "Enter Destination Location..."
            label3.textContent = ""
            radiusInput.type = "hidden"
        }
        else if(selectElement.value == "L&L"){
            label1.textContent = "Enter Longitude..."
            label2.textContent = "Enter Latitude..."
            label3.textContent = "Enter flight radius..."
            radiusInput.type = "text"
        }
    }

    const map = L.map('map').setView([37.8, -96], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const airports = [
  { code: 'LAX', lat: 33.9425, lng: -118.4081 },
  { code: 'JFK', lat: 40.6413, lng: -73.7781 },
  { code: 'SFO', lat: 37.6213, lng: -122.3790 },
  { code: 'ORD', lat: 41.9742, lng: -87.9073 },
  { code: 'DFW', lat: 32.8975, lng: -97.0381 },
  { code: 'DEN', lat: 39.8617, lng: -104.6732 },
  { code: 'LAS', lat: 36.1699, lng: -115.1398 },
  { code: 'SEA', lat: 47.4502, lng: -122.3088 },
  { code: 'ATL', lat: 33.6367, lng: -84.4281 },
  { code: 'EWR', lat: 40.6925, lng: -74.1687 },
  { code: 'MCO', lat: 28.4294, lng: -81.3089 },
  { code: 'MIA', lat: 25.7959, lng: -80.2870 },
  { code: 'PHX', lat: 33.4342, lng: -112.0116 },
  { code: 'IAH', lat: 29.9902, lng: -95.3368 },
  { code: 'BOS', lat: 42.3643, lng: -71.0052 },
  { code: 'DCA', lat: 38.8512, lng: -77.0402 },
  { code: 'LGA', lat: 40.7769, lng: -73.8740 },
  { code: 'MSP', lat: 44.8800, lng: -93.2167 },
  { code: 'DTW', lat: 42.2121, lng: -83.3488 },
  { code: 'BWI', lat: 39.1754, lng: -76.6683 },
  { code: 'SLC', lat: 40.7884, lng: -111.9778 },
  { code: 'CLT', lat: 35.2144, lng: -80.9473 },
  { code: 'SAN', lat: 32.7336, lng: -117.1897 },
  { code: 'TPA', lat: 27.9756, lng: -82.5333 },
  { code: 'PHL', lat: 39.8744, lng: -75.2438 },
  { code: 'FLL', lat: 26.0742, lng: -80.1496 },
  { code: 'MDW', lat: 41.7868, lng: -87.7522 },
  { code: 'BNA', lat: 36.1249, lng: -86.6782 },
  { code: 'DAL', lat: 32.8471, lng: -96.8517 },
  { code: 'HNL', lat: 21.3187, lng: -157.9225 },
  { code: 'PDX', lat: 45.5898, lng: -122.5951 },
  // ... Add more airport data here
];
    
    airports.forEach(airport => {
        const marker = L.marker([airport.lat, airport.lng]).addTo(map);
        marker.bindPopup("<strong>Airport code:</strong>"+ airport.code);
  });
  

  });


 