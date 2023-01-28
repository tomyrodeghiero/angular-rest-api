import app from "./app.js";
import { connectToDB } from "./utils/mongoose.js";

async function main() {
  await connectToDB();
  app.listen(5000);
  console.log("Server is running on port", 5000);
}

main();
