require("dotenv").config()

const app = require("./src/app")

const connectToDb = require("./src/config/database")


connectToDb()

const server = app.listen(3000, () => {
  console.log("Server running on port 3000")
})

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error("Port 3000 is already in use. Please close the other process and try again.")
    process.exit(1)
  } else {
    throw err
  }
})