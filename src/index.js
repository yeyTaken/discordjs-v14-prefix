require('module-alias/register');
const client = require("@structures/module");

require('@discord/client/handler')(client);
client.login(client.token)
