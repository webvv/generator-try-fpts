const os = require('os');
const path = require('path');

function initialConfig(generator) {
  return {
    projectParentPath: path.join(os.homedir(), 'try'),
    selectedEditorId: '',
    editors: [
      {
        id: 'mac_finder',
        name: 'Open in Finder (MacOS)',
        command: 'open',
        args: ['$PACKAGE_DIRECTORY']
      },
      {
        id: 'vim',
        name: 'Vim',
        command: 'vim',
        args: ['$PACKAGE_INDEX_FILE']
      },
      {
        id: 'sublime',
        name: 'Sublime Text',
        command: 'subl',
        args: ['$PACKAGE_DIRECTORY', '$PACKAGE_INDEX_FILE']
      },
      {
        id: 'vscode',
        name: 'Visual Studio Code',
        command: 'code',
        args: ['$PACKAGE_DIRECTORY', '$PACKAGE_INDEX_FILE']
      }
    ]
  }
}

module.exports.initialConfig = initialConfig