// trips-data.js

const tripsData = [
  {
    id: "trip1",
    name: "My Awesome Road Trip to the Mountains",
    description: "A 3-day adventure exploring scenic routes and hidden gems.",
    // Trajectory: array of [latitude, longitude] pairs
    trajectory: [
      [34.0522, -118.2437], // Los Angeles (example)
      [34.1381, -118.3534], // Burbank
      [34.2075, -118.4003], // San Fernando
      [34.4208, -118.5000]  // Santa Clarita (example stop)
    ],
    // Points of Interest: where stories and experiences are attached
    pointsOfInterest: [
      {
        coordinates: [34.0522, -118.2437], // Must match a point in trajectory or be distinct
        title: "Start of the Journey: Downtown LA",
        story: "Packed my bags and hit the road early in the morning. The city was just waking up.",
        image: null // Optional: "images/trip1/la_start.jpg"
      },
      {
        coordinates: [34.4208, -118.5000],
        title: "First Stop: Mountain View Point",
        story: "Stopped here for a breathtaking view of the valley. The air was crisp and fresh. Met a friendly squirrel!",
        image: "images/aa.jpg" // Example image path
      },
      {
        coordinates: [34.5000, -118.6000], // Example distinct POI not on trajectory line
        title: "Hidden Waterfall Hike",
        story: "Took a detour to find this amazing waterfall. The hike was challenging but worth it.",
        image: null
      }
    ],
    // Optional: style for this specific trip's trajectory
    style: {
      color: 'blue',
      weight: 5
    }
  },
  {
    id: "trip2",
    name: "Coastal Cycling Adventure",
    description: "Cycling along the beautiful Pacific coast.",
    trajectory: [
      [37.7749, -122.4194], // San Francisco
      [37.6390, -122.4280], // Pacifica
      [37.2300, -122.4000]  // Half Moon Bay
    ],
    pointsOfInterest: [
      {
        coordinates: [37.7749, -122.4194],
        title: "Golden Gate Start",
        story: "Started my cycling trip with the Golden Gate Bridge in view.",
        image: null
      },
      {
        coordinates: [37.2300, -122.4000],
        title: "Relaxing at Half Moon Bay",
        story: "Reached Half Moon Bay, perfect spot for a break and some seafood.",
        image: "images/trip2/hmb.jpg"
      }
    ],
    style: {
      color: 'green',
      weight: 4
    }
  }
  // Add more trip objects here
];
