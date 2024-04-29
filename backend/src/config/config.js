const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../.env") });

module.exports = {
  port: 8082,
  mongoose: {
    url: "mongodb+srv://ehteshamtarique1:DXBAUjK5Y9ED6DLG@cluster0.2uklvzd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  },
};