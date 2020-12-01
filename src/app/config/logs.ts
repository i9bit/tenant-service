import logs from 'debug';

const info = logs('app:info');
const warn = info.extend('app:warn');
const debug = warn.extend('app:debug');
const error = debug.extend('app:error');
const all = error.extend('app:*');

export { info, warn, debug, error, all };
