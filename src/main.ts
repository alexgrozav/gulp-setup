const assets = require('../config/env/assets.development.json');

for(let i = 0; i < assets.stylesheets.length; i += 1){
  let stylesheet = assets.stylesheets[i];
  require(stylesheet);
}

for(let i = 0; i < assets.scripts.length; i += 1){
  let script = assets.scripts[i];
  require(script);
}
