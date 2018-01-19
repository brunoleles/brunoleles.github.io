
import * as Stats from 'stats.js';

var stats = new Stats();
(<any>stats).setMode(0);

// $('body').append(stats.domElement);

export default {
  begin: stats.begin,
  end: stats.end
};
