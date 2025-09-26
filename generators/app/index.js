const os = require('os');
const path = require('path');
const GeneratorModule = require('yeoman-generator');
const { getInput } = require('./utils.js');
const { inputObjects } = require('./inputs.js');
const { initialConfig } = require('./initialConfig.js')
const { AbsoluteConfig } = require('./AbsoluteConfig.js')
const Generator = GeneratorModule.default

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);

    this.GENERATOR_NAME = 'try-fpts'
    this.ABSOLUTE_CONFIG_FILENAME = path.join(os.homedir(), `.yo-rc.${this.GENERATOR_NAME}.json`)
    this.absoluteConfig = new AbsoluteConfig(this.ABSOLUTE_CONFIG_FILENAME, initialConfig(this))
    this.inputObjects = inputObjects(this)
  }

  async prompting() {
    this.inputValues = {}

    for (const inputObject of this.inputObjects) {
      this.inputValues[inputObject.name] = await getInput(this, inputObject)
    }

    this.absoluteConfig.set('projectParentPath', this.inputValues['projectParentPath'])
    this.absoluteConfig.set('selectedEditorId', this.inputValues['selectedEditorId'])
    this.projectDirectoryName = cleanProjectDirectoryName(new Date().toISOString(), this.inputValues.projectName)
    this.projectDirectoryPath = path.join(this.inputValues['projectParentPath'], this.projectDirectoryName)
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('**/*'),
      this.projectDirectoryPath,
      { projectName: this.inputValues.projectName } 
    );
  }

  async install() {
    this.spawnSync('npm', ['install'], { cwd: this.projectDirectoryPath });

    const id = this.inputValues['selectedEditorId']
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
      if (arg === '$PACKAGE_DIRECTORY') {
        return this.projectDirectoryPath;
      } else if (arg === '$PACKAGE_INDEX_FILE') {
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
        `   ${this.ABSOLUTE_CONFIG_FILENAME}` +
        `   \n`
      )
    }
  }
};

function cleanProjectDirectoryName(isoDateString, projectName) {
  const [date, timeRaw] = isoDateString.split('T')
  const [time] = timeRaw.split('.')

  return date.replaceAll('-', '') + time.replaceAll(':', '') + '_' + projectName
}