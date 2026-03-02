
require("dotenv").config(); // ✅ must be the first line

const express = require("express");
const connect = require("./config/db");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000; // ✅ fixed case + fallback

app.use(express.json());
// app.use(cors({ origin: `http://localhost:${port}`, credentials: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


// ✅ Import controllers AFTER dotenv is loaded
const userController = require("./controllers/user.controller");
const checkoutController = require("./controllers/checkout.controller");
const orderController = require("./controllers/order.controller");
const paymentController = require("./controllers/payment.controller");
const successController = require("./controllers/success.controller");

const flightRoutes = require("./routes/flightRoutes");

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/users", userController);
app.use("/checkout", checkoutController);
app.use("/order", orderController);
app.use("/razorpay", paymentController);
app.use("/success", successController);
app.use("/api", flightRoutes);


const start = async () => {
  await connect();
  app.listen(port, () => console.log(`✅ Server running on http://localhost:${port}`));
};

module.exports = start;
