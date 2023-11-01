const app = require("./app");
const { port } = require("./config");

// listing the server
app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});
