import { gray } from './utils.js'
import { GENERATOR_NAME } from './constants.js'

export function inputDefs(generator){
  return [
    {
      name: 'projectParentPath',
      message: `What directory paht do you want to scaffold the project?\n${gray("(This path will be saved for your next run):")}`,
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
      message: `What is your playground project name?\n${gray("(Project directory name will be prefixed to avoid collisions):")}`, 
      default: GENERATOR_NAME.replaceAll('-', '_'), 
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
      name: 'selectedEditorId', 
      message: `How do you want to open your package?\n${gray(`(Add new editors to "${generator.ABSOLUTE_CONFIG_FILENAME}")`)}`,
      type: 'list', 
      choices: [
        { name: 'None', value: '' }, 
        ...generator.absoluteConfig.get('editors').map(x => ({ name: x.name, value: x.id }))
      ],
      default: generator.absoluteConfig.get('selectedEditorId'),
    }
  ]
} 
