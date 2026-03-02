const start = require("./server");
const getFlights = require("./utils/flightapi"); // <-- add this line

// Start the server
start();

// // Test AviationStack API after the server starts
// (async () => {
//   const flights = await getFlights("DEL", "BOM");
//   console.log("✈️ Sample Flights:", flights);
// })();
