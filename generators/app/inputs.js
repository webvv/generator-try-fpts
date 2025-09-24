function inputObjects(generator){
  return [
    {
      name: 'projectParentPath',
      message: 'What directory paht do you want to scaffold the project?\n(This path will be saved for your next run):',
      default: generator.absoluteConfig.get('projectParentPath') || '',
      validate: input => {
        if (!input || input.trim() === '') {
          return 'project Parent Path is required';
        }
        return true;
      }
    },
    { 
      name: 'projectName', 
      message: 'What is your playground project name?', 
      default: generator.GENERATOR_NAME.replaceAll('-', '_'), 
      validate: input => {
        if (!input || input.trim() === '') {
          return 'Project name is required';
        }
        if (!/^[A-Za-z0-9_]+$/.test(input)) {
          return 'Only letters, numbers and underscore (_) are allowed';
        }
        return true;
      }
    }, 
    {
      name: 'openInVsCode', 
      message: 'Open playground directory in VSCode?',
      type: 'confirm', 
      default: true,
    }
  ]
} 
module.exports.inputObjects = inputObjects