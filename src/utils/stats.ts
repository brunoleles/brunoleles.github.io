
const Stats = import('stats.js') as any;

var stats = new Stats();

stats.setMode(0);

// $('body').append(stats.domElement);

export default {
  begin: stats.begin,
  end: stats.end
};
