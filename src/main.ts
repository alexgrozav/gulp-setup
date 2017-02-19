import { HelloModule } from './module/module';
const config = require('../config/env/development');

for(let i = 0; i < config.assets.scripts.length; i += 1){
  let script = config.assets.scripts[i];
  require(script);
}

// let hello: any = new HelloModule();
// console.log(hello.title);
