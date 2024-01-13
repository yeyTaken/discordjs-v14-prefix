const { Client } = require("discord.js");
const fs = require("fs")
const path = require("path")

module.exports = async (client) => {

  fs.readdirSync(path.join(__dirname, '../commands/prefix')).forEach(local => {
      const comandos = fs.readdirSync(path.join(__dirname, `../commands/prefix/${local}`));

      for (let file of comandos) {
          let puxar = require(path.join(__dirname, `../commands/prefix/${local}/${file}`));

          if (puxar.name) {
              client.commands.set(puxar.name, puxar);
          }
          if (puxar.aliases && Array.isArray(puxar.aliases)) {
              puxar.aliases.forEach(x => client.aliases.set(x, puxar.name));
          }
      }
  });

	  //--
    const eventsPath = path.join(__dirname, "../../src/events"); 

    const events = require("fs")
      .readdirSync(eventsPath)
      .filter((file) => file.endsWith(".js"));

    client.await = (ms) =>
      new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, ms)
      );

    for (let file of events) {
      let event = require(path.join(eventsPath, file));
      if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
      } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
      }
    }
  //--
}