const axios = require("axios");
require("dotenv").config();

const FLIGHT_API_URL = "http://api.aviationstack.com/v1/flights";

async function getFlights(source, destination) {
  try {
    const response = await axios.get(FLIGHT_API_URL, {
      params: {
        access_key: process.env.AVIATIONSTACK_API_KEY,
        dep_iata: source,
        arr_iata: destination,
        limit: 10
      }
    });
    return response.data.data;
  } catch (error) {
    console.error("❌ Error in getFlights:", error.message);
    return [];
  }
}

module.exports = getFlights;
