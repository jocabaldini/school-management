const server = require("./server")
const application = require("./application")

const init = async () => {
  const serverInstance = await server(application())
  try {
    await serverInstance.start()
    console.log("Server started")
  } catch (error) {
    console.log(`Error while starting server: ${error}`)
  }
}

init()
