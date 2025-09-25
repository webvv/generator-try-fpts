const os = require('os');
const path = require('path');

function initialConfig(generator) {
  return {
    projectParentPath: path.join(os.homedir(), 'try'),
    selectedEditorId: '',
    editors: [
      {
        id: 'echo',
        name: 'Show Package path',
        command: 'echo',
        args: ['$PACKAGE_DIRECTORY']
      },
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
        id: 'vscode',
        name: 'Visual Studio Code',
        command: 'code',
        args: ['$PACKAGE_DIRECTORY', '$PACKAGE_INDEX_FILE']
      },
    ]
  }
}

module.exports.initialConfig = initialConfig