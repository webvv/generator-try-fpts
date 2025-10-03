import os from 'os'
import path from 'path'
import { $PACKAGE_DIRECTORY, $PACKAGE_INDEX_FILE } from './constants.js'

export function initialConfig(generator) {
  return {
    projectParentPath: path.join(os.homedir(), 'try'),
    selectedEditorId: '',
    editors: [
      {
        id: 'mac_finder',
        name: 'Open in Finder (MacOS)',
        command: 'open',
        args: [$PACKAGE_DIRECTORY]
      },
      {
        id: 'vim',
        name: 'Vim',
        command: 'vim',
        args: [$PACKAGE_INDEX_FILE]
      },
      {
        id: 'sublime',
        name: 'Sublime Text',
        command: 'subl',
        args: [$PACKAGE_DIRECTORY, $PACKAGE_INDEX_FILE]
      },
      {
        id: 'vscode',
        name: 'Visual Studio Code',
        command: 'code',
        args: [$PACKAGE_DIRECTORY, $PACKAGE_INDEX_FILE]
      },
      {
        id: 'codium',
        name: 'VSCodium',
        command: 'codium',
        args: [$PACKAGE_DIRECTORY, $PACKAGE_INDEX_FILE]
      },
      {
        id: 'zed',
        name: 'Zed',
        command: 'zed',
        args: [$PACKAGE_DIRECTORY, $PACKAGE_INDEX_FILE]
      },
    ]
  }
}
