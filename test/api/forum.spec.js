import { expect } from 'chai';

import { getForumReport } from '../../src/core/api/forum.js';

import { createServer } from '../helper.js';

import emptyResponse from '../fixtures/forum/empty.json' with { type: 'json' };
import plentyResponse from '../fixtures/forum/plenty.json' with { type: 'json' };


describe('api/forum', function() {

  let server;

  beforeEach(() => {
    server = createServer();
    return server.start();
  });

  afterEach(() => {
    server.stop();
  });


  it('should return a friendly message if no unanswered topics are found', async function() {

    // given
    const baseUrl = server.getBaseUrl();
    server.setResponse(emptyResponse);

    // when
    const report = await getForumReport({ baseUrl });

    // then
    expect(report).to.eql({ topics: [] });
  });


  it('should return a detailed report if unanswered topics are found', async function() {

    // given
    const baseUrl = server.getBaseUrl();
    server.setResponse(plentyResponse);

    // when
    const report = await getForumReport({ baseUrl });

    // then
    expect(report).to.eql({
      topics: [
        {
          'id': 10941,
          'title': 'Export custom-components/images',
          'url': 'http://localhost:3000/t/export-custom-components-images/10941',
        },
        {
          'id': 10938,
          'title': 'Error when using the modeler',
          'url': 'http://localhost:3000/t/error-when-using-the-modeler/10938',
        },
        {
          'id': 10936,
          'title': 'Push shapes to background / foreground',
          'url': 'http://localhost:3000/t/push-shapes-to-background-foreground/10936',
        },
        {
          'id': 10931,
          'title': 'Error when trying to associate components (task/annotation)',
          'url': 'http://localhost:3000/t/error-when-trying-to-associate-components-task-annotation/10931',
        }
      ]
    });
  });
});