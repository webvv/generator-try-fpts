import os from 'os'
import path from 'path'
import Generator from 'yeoman-generator'
import { initialConfig  } from '../app/initialConfig.js'
import { AbsoluteConfig } from '../app/AbsoluteConfig.js'
import { ABSOLUTE_CONFIG_FILENAME,  } from '../app/constants.js'

export default class extends Generator {

  constructor(args, opts) {
    super(args, opts);
  }

  configure() {
    this.absoluteConfig = new AbsoluteConfig(ABSOLUTE_CONFIG_FILENAME)

    this.absoluteConfig._write(initialConfig(this))
  }
  
};
