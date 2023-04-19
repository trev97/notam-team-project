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
  // ... Add more airport data here
];
    
    airports.forEach(airport => {
        const marker = L.marker([airport.lat, airport.lng]).addTo(map);
        marker.bindPopup("<strong>Airport code:</strong>"+ airport.code);
  });
  

  });


 