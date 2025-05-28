document.addEventListener('DOMContentLoaded', () => {
    // Initialize the map
    const map = L.map('map').setView([20, 0], 2); // Default view (latitude, longitude, zoom)

    // Add a tile layer (OpenStreetMap is free)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const tripSelector = document.getElementById('trip-selector');
    const storyDisplay = document.getElementById('story-display');
    const storyTitle = document.getElementById('story-title');
    const storyImage = document.getElementById('story-image');
    const storyText = document.getElementById('story-text');
    const closeStoryButton = document.getElementById('close-story');

    let allMapLayers = L.featureGroup().addTo(map); // Group to manage layers

    function clearMap() {
        allMapLayers.clearLayers();
        storyDisplay.style.display = 'none';
    }

    function displayTrip(trip) {
        // Draw trajectory
        const trajectoryStyle = trip.style || { color: 'red', weight: 3 };
        const polyline = L.polyline(trip.trajectory, trajectoryStyle).addTo(allMapLayers);

        // Add markers for points of interest
        trip.pointsOfInterest.forEach(poi => {
            const marker = L.marker(poi.coordinates).addTo(allMapLayers);
            let popupContent = `<h4>${poi.title}</h4><p>${poi.story}</p>`;
            if (poi.image) {
                popupContent += `<img src="${poi.image}" alt="${poi.title}" style="max-width:150px; height:auto;">`;
            }
            marker.bindPopup(popupContent);

            // Optionally, also show story in the dedicated div on click
            marker.on('click', () => {
                storyTitle.textContent = poi.title;
                storyText.textContent = poi.story;
                if (poi.image) {
                    storyImage.src = poi.image;
                    storyImage.alt = poi.title;
                    storyImage.style.display = 'block';
                } else {
                    storyImage.style.display = 'none';
                }
                storyDisplay.style.display = 'block';
            });
        });
    }
    
    function loadTrips(selectedTripId = null) {
        clearMap();
        let bounds;

        const tripsToDisplay = selectedTripId 
            ? tripsData.filter(trip => trip.id === selectedTripId)
            : tripsData;
	console.log(tripsToDisplay)
        if (tripsToDisplay.length === 0) {
            console.warn("No trips to display or trip ID not found.");
            map.setView([20, 0], 2); // Reset to default view if no trips
            return;
        }

        tripsToDisplay.forEach(trip => {
            displayTrip(trip);
        });

        if (allMapLayers.getLayers().length > 0) {
            bounds = allMapLayers.getBounds();
            if (bounds.isValid()) {
                map.fitBounds(bounds, { padding: [50, 50] }); // Add some padding
            } else if (tripsToDisplay.length === 1 && tripsToDisplay[0].trajectory.length > 0) {
                // If bounds are not valid (e.g. single point POI trip), center on first point
                 map.setView(tripsToDisplay[0].trajectory[0] || tripsToDisplay[0].pointsOfInterest[0].coordinates, 10);
            }
        } else {
             map.setView([20, 0], 2); // Default if no layers added (e.g., trip with no geometry)
        }
    }

    // Populate trip selector
    tripsData.forEach(trip => {
        const option = document.createElement('option');
        option.value = trip.id;
        option.textContent = trip.name;
        tripSelector.appendChild(option);
    });

    // Event listener for trip selector
    tripSelector.addEventListener('change', (event) => {
        const selectedTripId = event.target.value;
        if (selectedTripId) {
            loadTrips(selectedTripId);
        } else {
            loadTrips(); // Show all trips
        }
    });
    
    // Close story display
    closeStoryButton.addEventListener('click', () => {
        storyDisplay.style.display = 'none';
    });

    // Initially load all trips
    loadTrips();
});
