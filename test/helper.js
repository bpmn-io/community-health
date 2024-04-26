import { createServer as nodeCreateServer } from 'node:http';

export function createServer() {
  return new MockServer();
}

class MockServer {
  constructor() {

    this.server = nodeCreateServer((_, res) => {
      const response = this.getResponse();

      res.statusCode = response.statusCode || 200;
      res.write(response.body || '');
      res.end();
    });
  }

  start() {
    return new Promise(resolve => {
      this.server.listen(3000, resolve);
    });
  }

  stop() {
    this.server.close();
  }

  setResponse(body) {
    this._response = {
      body: JSON.stringify(body)
    };
  }

  getResponse() {
    return {
      statusCode: 200,
      body: '',
      ...(this._response || {})
    };
  }

  getBaseUrl() {
    return 'http://localhost:3000';
  }
}
