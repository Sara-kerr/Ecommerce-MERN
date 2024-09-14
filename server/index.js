const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const apiRoutes = require('./routes/api.js');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Ecommerce-website'
  })
  .then(() => console.log("MongoDB Connected to Ecommerce-website"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("API is running on serveur  ...");
});


const config = {}; 
const db = mongoose.connection; 

app.use("/api", apiRoutes({ config, db }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
