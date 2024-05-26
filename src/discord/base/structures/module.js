const { Client, Collection } = require('discord.js');
const settings = require("@settings/main")
const { intents, partials, ws } = require('./types/intents');
const fs = require('fs');
const path = require("path")
const packageJson = require('../../../../package.json');
const client = new Client({ intents, partials, ws });
require('dotenv').config();

module.exports = client;
client.token = process.env.APP_TOKEN;
client.cor = settings.app.cor;
client.prefix = settings.app.prefix;
client.mongoDB = process.env.MONGO_URI;
client.author = packageJson.author;
client.commands = new Collection();
client.slashCommands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync(path.join(__dirname, '../../client/commands'))