var glob2tree = require('./index');


glob2tree(['**/*']);
glob2tree(['**/*', '!node_modules/**/*']);

