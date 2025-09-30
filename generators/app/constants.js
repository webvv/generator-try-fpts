import os from 'os' 
import path from 'path' 

export const GENERATOR_NAME = 'try-fpts'
export const ABSOLUTE_CONFIG_FILENAME = path.join(os.homedir(), '.try', `${GENERATOR_NAME}.yo-rc.json`)

export const $PACKAGE_DIRECTORY = '$PACKAGE_DIRECTORY'
export const $PACKAGE_INDEX_FILE = '$PACKAGE_INDEX_FILE'