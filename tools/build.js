/* eslint-disable no-console */
import webpack from 'webpack';
import config from '../webpack.config.prod';
import colors from 'colors';

// this assures React is built in prod mode and that the Babel dev config doesn't apply.
process.env.NODE_ENV = 'production';

console.log(
  colors.magenta('Generating minified bundle for production via Webpack...'));

webpack(config).run((error, stats) => {
  if (error) { // so a fatal error occurred. Stop here.
    console.log(colors.red(error));
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(colors.red(error)));
  }

  if (jsonStats.hasWarnings) {
    console.log('Webpack generated the following warnings: ');
    jsonStats.warnings.map(warning => console.log(colors.yellow(warning)));
  }

  console.log(colors.magenta(`Webpack stats: ${stats}`));

  // if we got this far, the build succeeded.
  console.log(colors.green('App compiled in production mode in /public.'));

  return 0;
});
