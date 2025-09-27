
/**
 * Create an input config for getInput AND register it as a Yeoman option
 *
 * @param {object} generator - The Yeoman generator context (usually `this`)
 * @param {object} config - Config for the input
 * @param {string} config.name - The key for the input (matches CLI option)
 * @param {string} config.message - The prompt message
 * @param {string} [config.type="input"] - Prompt type (input, confirm, list, checkbox, etc.)
 * @param {any} [config.default] - Default value
 * @param {function} [config.validate] - Validation function
 * @param {array} [config.choices] - Choices (if applicable)
 * @returns {object} - Config object to pass into getInput
 */
export function makeInput(generator, { 
  name, 
  message, 
  type = "input", 
  default: def, 
  validate, 
  choices 
}) {
  // Register option for CLI help
  generator.option(name, {
    type: type === "confirm" ? Boolean : String, // map Yeoman option type
    description: message,
    default: def,
  });

  return { name, message, type, default: def, validate, choices };
}

/**
 * Helper to get an input from either CLI options or Yeoman prompt.
 *
 * @param {object} generator - The Yeoman generator context (usually `this`)
 * @param {object} config - Input config
 * @param {string} config.name - The key for the input (matches CLI option)
 * @param {string} config.message - The prompt message
 * @param {string} [config.type="input"] - Prompt type (input, confirm, list, checkbox, etc.)
 * @param {any} [config.default] - Default value if not provided
 * @param {function} [config.validate] - Validation function (value) => true|string
 * @param {array} [config.choices] - Choices (for list, rawlist, expand, checkbox)
 * @returns {Promise<any>} - The resolved input value
 */
export async function getInput(generator, { 
  name, 
  message, 
  type = "input", 
  default: def, 
  validate, 
  choices 
}) {
  // If CLI option already provided, skip prompt
  if (generator.options[name] !== undefined) {
    const value = generator.options[name];
    if (validate) {
      const valid = validate(value);
      if (valid !== true) {
        generator.env.error(`Invalid value for --${name}: ${valid}`);
      }
    }
    return value;
  }

  // Otherwise prompt the user
  const answers = await generator.prompt([
    {
      type,
      name,
      message,
      default: def,
      validate: validate || (() => true),
      choices, // used only when relevant (list, rawlist, expand, checkbox)
    },
  ]);

  return answers[name];
}
