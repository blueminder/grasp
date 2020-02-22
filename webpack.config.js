const webpack = require('webpack'),
      path = require('path'),
      CleanWebpackPlugin = require('clean-webpack-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      WebpackExtensionManifestPlugin = require('webpack-extension-manifest-plugin');
// TODO remove plugins from package.json

const T = {
    CHROME  : 'chrome',
    FIREFOX: 'firefox',
};

const env = {
    TARGET : process.env.TARGET, // TODO assert not null?
    RELEASE: process.env.RELEASE,
};

const pkg = require('./package.json');
const baseManifest = require('./src/manifest.json');

const release = env.RELEASE == 'YES' ? true : false;
const dev = !release; // meh. maybe make up my mind?
const target = env.TARGET;

const name = "grasp" + (dev ? ' [dev]' : '');

// Firefox wouldn't let you rebind its default shortcuts most of which use Shift
// On the other hand, Chrome wouldn't let you use Alt
const modifier = target === T.CHROME ? 'Shift' : 'Alt';

// ugh. declarative formats are shit.
const commandsExtra = {
    "capture-simple": {
        "suggested_key": {
            "default": `Ctrl+${modifier}+C`,
            "mac":  `Command+${modifier}+C`
        }
    },
    "_execute_browser_action": {
        "suggested_key": {
            "default": `Ctrl+${modifier}+Y`,
            "mac":  `Command+${modifier}+Y`
        }
    },
};

// TODO make permissions literate
const permissions = [
    "storage",
    "notifications",
    "activeTab",
    "http://localhost/capture",
    "https://localhost/capture"
];


const manifestExtra = {
    name: name,
    version: pkg.version,
    description: pkg.description,
    permissions: permissions,
    commands: commandsExtra,
    optional_permissions: [
        "http://*/capture",
        "https://*/capture",
    ],
};

if (dev) {
    manifestExtra.content_security_policy = "script-src 'self' 'unsafe-eval'; object-src 'self'";
}

if (target === T.CHROME) {
    manifestExtra.options_ui = {chrome_style: true};
}
if (target === T.FIREFOX) {
    manifestExtra.options_ui = {browser_style: true};
    manifestExtra.browser_action = {browser_style: true};
}

const build_path = path.join(__dirname, "dist"); // TODO target??

const options = {
  mode: dev ? 'development' : 'production', // TODO map directly from MODE env var?
  optimization: {
    // https://webpack.js.org/configuration/optimization
    // don't think minimize worth it for such a tiny extension
    minimize: false
  },
  entry: {
    background  : path.join(__dirname, "src", "js", "background"),
    popup       : path.join(__dirname, "src", "js", "popup"),
    options_page: path.join(__dirname, "src", "js", "options_page"),
  },
  output: {
      path: build_path,
      filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader", // TODO different from promnesia??
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([build_path + "/*"]),
    new CopyWebpackPlugin([
        { from: 'src/img/*.png', flatten: true },
        { from: 'src/*.html'   , flatten: true },
        { from: 'src/js/capture_web.js', flatten: true },
    ]),
    new WebpackExtensionManifestPlugin({
        config: {
            base: baseManifest,
            extend: manifestExtra,
        }
    }),
  ]
};

// TODO https://webpack.js.org/configuration/devtool
if (dev) {
  options.devtool = "cheap-module-eval-source-map";
}

module.exports = options;
