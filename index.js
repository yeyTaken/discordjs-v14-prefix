const client = require("./src/api/module")

require('./src/handler')(client);
client.login(client.token)
