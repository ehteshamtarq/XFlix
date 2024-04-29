const mongoose = require("mongoose");
const config = require("./src/config/config");
const app = require("./src/app");

let server;

mongoose.connect(config.mongoose.url).then(() => {
  console.log("Connected to MongoDB");
  app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
  });
});

// process.on("SIGTERM", () => {
//   console.log("SIGTERM received");
//   if (server) {
//     server.close();
//   }
// });