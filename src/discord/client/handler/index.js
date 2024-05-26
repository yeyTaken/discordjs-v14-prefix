const fs = require("fs");
const path = require("path");

module.exports = async (client) => {
  const eventsPath = path.join(__dirname, "../events");

  function getJsFiles(dir, files = []) {
    const items = fs.readdirSync(dir);

    items.forEach(item => {
      const fullPath = path.join(dir, item);
      if (fs.statSync(fullPath).isDirectory()) {
        getJsFiles(fullPath, files);
      } else if (item.endsWith('.js')) {
        files.push(fullPath);
      }
    });

    return files;
  }

  const events = getJsFiles(eventsPath);

  client.await = (ms) =>
    new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, ms)
    );

  for (let file of events) {
    let event = require(file);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
      client.on(event.name, (...args) => event.execute(client, ...args));
    }
  }
}
