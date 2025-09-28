import os from 'os'
import path from 'path'
import Generator from 'yeoman-generator'
import { getInput, makeInput, prefixProjectDirectoryName } from './utils.js'
import { inputDefs } from './inputs.js'
import { initialConfig  } from './initialConfig.js'
import { AbsoluteConfig } from './AbsoluteConfig.js'
import { ABSOLUTE_CONFIG_FILENAME, $PACKAGE_DIRECTORY, $PACKAGE_INDEX_FILE } from './constants.js'

export default class extends Generator {

  /* CUSTOM PROPERTIES ON this */
  // inputDefs
  // inputVals
  // absoluteConfig
  // projectDirectoryName
  // projectDirectoryPath

  constructor(args, opts) {
    super(args, opts);

    this.absoluteConfig = new AbsoluteConfig(ABSOLUTE_CONFIG_FILENAME, initialConfig(this))
    this.inputDefs = inputDefs(this)
    this.inputDefs.forEach(def => makeInput(this, def))
  }

  async prompting() {
    this.inputVals = {}

    for (const inputObject of this.inputDefs) {
      this.inputVals[inputObject.name] = await getInput(this, inputObject)
    }

    this.absoluteConfig.set('projectParentPath', this.inputVals['projectParentPath'])
    this.absoluteConfig.set('selectedEditorId', this.inputVals['selectedEditorId'])
    this.projectDirectoryName = prefixProjectDirectoryName(new Date().toISOString(), this.inputVals.projectName)
    this.projectDirectoryPath = path.join(this.inputVals['projectParentPath'], this.projectDirectoryName)
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('**/*'),
      this.projectDirectoryPath,
      { projectName: this.inputVals.projectName },
      {}, 
    );

    this.fs.copyTpl(
      this.templatePath('.npmrc'),
      path.join(this.projectDirectoryPath, '.npmrc') ,
    );
  }

  async install() {
    this.spawnSync('npm', ['install'], { cwd: this.projectDirectoryPath });

    const id = this.inputVals['selectedEditorId']
    const selectedEditorObject = [
      {id: '', name: 'None', command: 'echo', args: [] },
      ...this.absoluteConfig.get('editors')
    ].find(x => x.id === id)

    if (!selectedEditorObject) {
      console.log('No editor found')
      return
    }

    const { command, args } = selectedEditorObject

    const finalArgs = args.map(arg => {
      if (arg === $PACKAGE_DIRECTORY) {
        return this.projectDirectoryPath;
      } else if (arg === $PACKAGE_INDEX_FILE) {
        return path.join(this.projectDirectoryPath, 'src', 'index.ts')
      }

      return arg
    })
    
    console.log(
      `\n` + 
      `Project created in directory:\n` +
      `  ${this.projectDirectoryPath}\n` +
      `  \n`
    )

    try {
      this.spawnSync(command, finalArgs);
    } catch(error) {
      console.log(
        `Failed to execute command below:\n` +
        `   ${command} ${finalArgs.join(' ')}\n` +
        `   \n` +
        `Check yor configuration in:\n` +
        `   ${ABSOLUTE_CONFIG_FILENAME}` +
        `   \n`
      )
    }
  }
};
