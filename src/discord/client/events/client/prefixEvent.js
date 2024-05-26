const fs = require("fs");
const path = require("path");

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

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    const commandsPath = path.join(__dirname, '../../commands/prefix');
    const commandFiles = getJsFiles(commandsPath);

    commandFiles.forEach(file => {
      const command = require(file);
      if (command.name) {
        client.commands.set(command.name, command);
      }
      if (command.aliases && Array.isArray(command.aliases)) {
        command.aliases.forEach(alias => client.aliases.set(alias, command.name));
      }
    });
  },
};
