const config = require('../config/env/development');

for(let i = 0; i < config.assets.stylesheets.length; i += 1){
  let stylesheet = config.assets.stylesheets[i];
  require(stylesheet);
}

for(let i = 0; i < config.assets.scripts.length; i += 1){
  let script = config.assets.scripts[i];
  require(script);
}

import { HelloModule } from './module/module';

let hello: any = new HelloModule();
console.log(hello.title);
