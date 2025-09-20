const inputObjects = [{ 
    name: 'projectName', 
    message: 'What is your playground project name?', 
    default: 'try_fpts', 
    validate: input => {
      if (!input || input.trim() === '') {
        return 'Project name is required';
      }
      if (!/^[A-Za-z0-9_]+$/.test(input)) {
        return 'Only letters, numbers and underscore (_) are allowed';
      }
      return true;
    }
  }, {
    name: 'openInVsCode', 
    message: 'Open playground directory in VSCode?',
    type: 'confirm', 
    default: true,
  }
]

module.exports.inputObjects = inputObjects