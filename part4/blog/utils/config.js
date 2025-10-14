require("dotenv").config();

const PORT = process.env.PORT || 3003;
const DATABASE_URL = process.env.MONGODB_DB_URL;

module.exports = { PORT, DATABASE_URL }