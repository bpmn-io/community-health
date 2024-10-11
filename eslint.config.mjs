import bpmnIoPlugin from 'eslint-plugin-bpmn-io';

import babelParser from '@babel/eslint-parser';

export default [
  ...bpmnIoPlugin.configs.node.map(config => {
    return {
      ...config,
      files: [
        'karma.conf.js',
        '**/test/**/*.js'
      ]
    };
  }),
  ...bpmnIoPlugin.configs.mocha.map(config => {
    return {
      ...config,
      files: [
        '**/test/**/*.js'
      ]
    };
  }),
  {
    languageOptions: {
      globals: {
        sinon: true
      },
    },
    files: [
      '**/test/**/*.js'
    ]
  },

  // hook up babel parser
  {
    files: [ '**/*.js', '**/*.mjs' ],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          plugins: [
            '@babel/plugin-syntax-import-attributes'
          ]
        },
      }
    }
  }
];
