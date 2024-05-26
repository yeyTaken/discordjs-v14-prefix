const fs = require("fs");
const path = require('path');

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
  async execute(client) {
    const commandsPath = path.join(__dirname, '../../commands/slash');
    const commandFiles = getJsFiles(commandsPath);

    const arrayOfSlashCommands = [];
    commandFiles.forEach(file => {
      const command = require(file);
      if (!command?.name) return;
      client.slashCommands.set(command.name, command);

      if (["MESSAGE", "USER"].includes(command.type)) delete command.description;
      arrayOfSlashCommands.push(command);
    });

  },
};

