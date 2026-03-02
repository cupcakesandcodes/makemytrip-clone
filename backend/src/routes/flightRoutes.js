const express = require("express");
const getFlights = require("../utils/flightAPI");  // we’ll create this next
const router = express.Router();

router.get("/flights", async (req, res) => {
  const { source, destination } = req.query;
  if (!source || !destination) {
    return res.status(400).json({ error: "source and destination query params required" });
  }

  try {
    const flights = await getFlights(source, destination);
    return res.json(flights);
  } catch (err) {
    console.error("❌ Flight search error:", err);
    return res.status(500).json({ error: "Failed to fetch flights" });
  }
});

module.exports = router;
