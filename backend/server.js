import "dotenv/config";

import app from "./src/app.js";
import checkConnection from "./src/config/db.js";

await checkConnection();

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log("Server is running");
});
