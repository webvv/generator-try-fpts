const GeneratorModule = require('yeoman-generator');
const { inputObjects } = require('./inputs.js');
const { getInput } = require('./utils.js');
const Generator = GeneratorModule.default

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);

    this.inputObjects = inputObjects
  }

  async prompting() {
    this.inputValues = {}

    for (const inputObject of this.inputObjects) {
      this.inputValues[inputObject.name] = await getInput(this, inputObject)
    }

    this.projectDirectoryName = cleanProjectDirectoryName(new Date().toISOString(), this.inputValues.projectName)
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('**/*'),
      this.destinationPath(this.projectDirectoryName),
      { projectName: this.inputValues.projectName } 
    );
  }

  async install() {
    this.spawnSync('npm', ['install'], { cwd: this.destinationPath(this.projectDirectoryName) });

    if (this.inputValues.openInVsCode) {
      this.spawnSync('code', [this.destinationPath(this.projectDirectoryName), this.projectDirectoryName + '/src/index.ts']);
    }
  }
};

function cleanProjectDirectoryName(isoDateString, projectName) {
  const [date, timeRaw] = isoDateString.split('T')
  const [time] = timeRaw.split('.')

  return date.replaceAll('-', '') + time.replaceAll(':', '') + '_' + projectName
}