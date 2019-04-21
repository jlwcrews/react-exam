const app = require('./app.js')

const port = 8080


const server = app.listen(port, () => console.log("Server running on port " + port))
