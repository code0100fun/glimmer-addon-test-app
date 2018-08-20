'use strict';

const GlimmerApp = require('@glimmer/application-pipeline').GlimmerApp;
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

module.exports = function(defaults) {
  const nodeResolve = resolve({ jsnext: true, module: true, main: true });
  let app = new GlimmerApp(defaults, {
    rollup: {
      plugins: [
        dedupe(nodeResolve),
        nodeResolve,
        commonjs(),
      ],
    },
    sourcemaps: {
      enabled: false,
    }
  });

  return app.toTree();
};

function dedupe(defaultResolver) {
  const moduleCache = {};
  let modulePath;
  let moduleBase;
  let match;
  return {
    name: 'dedupe',
    resolveId: function resolveId(importee, importer) {
      if (importer) {
        [moduleBase, modulePath] = importer.split('node_modules');
        match = moduleCache[modulePath];
        if (match) {
          importer = match;
        } else if (modulePath) {
          moduleCache[modulePath] = importer;
        }
      }
      return defaultResolver.resolveId(importee, importer);
    },
  };
}
