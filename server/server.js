require("dotenv").config();

const app = require("./app");

require("./config/db");
require("./database/init");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});