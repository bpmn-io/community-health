#!/usr/bin/env node

import { parseArgs } from 'node:util';

import { getReport } from '../src/app.js';

run();

async function run() {
  const options = {
    format: {
      type: 'string',
      default: 'slack'
    }
  };
  const { values } = parseArgs({ options });

  const report = await getReport({ format: values.format });

  console.log(report);
}
