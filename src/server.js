const app = require("./index");

const connect = require("./configs/db");

app.listen(5678, async () => {
  try {
    await connect();
    console.log("listening port 5678");
  } catch (error) {
    console.log(error.message);
  }
});
