// config.js

const fs = require('fs');
const path = require('path');

class AbsoluteConfig {
  /**
   * Creates an instance of the Config class.
   * @param {string} filePath The absolute path to the JSON configuration file.
   */
  constructor(filePath) {
    this.filePath = filePath;

    // 1. Ensure the directory exists.
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      // The `recursive: true` option creates parent directories if needed.
      fs.mkdirSync(dir, { recursive: true });
    }

    // 2. Ensure the file exists.
    if (!fs.existsSync(this.filePath)) {
      // Create it with an empty JSON object if it's missing.
      this._write({});
    }
  }

  /**
   * A private helper method to read and parse the JSON file.
   * @returns {object} The parsed JSON data from the file.
   */
  _read() {
    try {
      const rawData = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(rawData);
    } catch (error) {
      console.error('Error reading or parsing config file:', error);
      // Return an empty object on error to prevent crashes.
      return {};
    }
  }

  /**
   * A private helper method to stringify and write data to the file.
   * @param {object} data The JavaScript object to write to the file.
   */
  _write(data) {
    // The `null, 2` arguments format the JSON for readability.
    const stringifiedData = JSON.stringify(data, null, 2);
    fs.writeFileSync(this.filePath, stringifiedData, 'utf8');
  }

  /**
   * Gets a value from the config by its key.
   * @param {string} key The key of the property to retrieve.
   * @returns {*} The value of the property, or undefined if not found.
   */
  get(key) {
    const data = this._read();
    return data[key];
  }

  /**
   * Sets a value in the config and immediately saves the file.
   * @param {string} key The key of the property to set.
   * @param {*} value The value to set for the property.
   */
  set(key, value) {
    const data = this._read();
    data[key] = value;
    this._write(data);
  }

  /**
   * Checks if a key exists in the config.
   * @param {string} key The key to check.
   * @returns {boolean} True if the key exists, false otherwise.
   */
  has(key) {
    const data = this._read();
    return Object.prototype.hasOwnProperty.call(data, key);
  }

  /**
   * Deletes a key-value pair from the config and saves the file.
   * @param {string} key The key of the property to delete.
   */
  delete(key) {
    const data = this._read();
    if (this.has(key)) {
      delete data[key];
      this._write(data);
    }
  }
}

module.exports.AbsoluteConfig = AbsoluteConfig;