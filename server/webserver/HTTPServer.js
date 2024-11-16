import Request from "./Request";
import authenticateUser from "../utils/authenticateUser";
import http from "http";
import url from "url";
import validateInput from "../utils/validateInput";

class HTTPServer {
  constructor(config) {
    this._config = config;
    this._server = null;
  }

  start() {
    const requestHandler = this.requestHandler.bind(this);
    this._server = http.createServer(requestHandler).listen(8009);
  }

  async stop() {
    await this._server.close();
  }

  async requestHandler(httpRequest, response) {
    const queryData = url.parse(httpRequest.url, true).query;
    const request = new Request(queryData, httpRequest, response);

    try {
      await authenticateUser(request, queryData);
    } catch (error) {
      request.setData(queryData);
      request.error(error.message);
      return;
    }

    const path = request.getPath();
    const endpoint = this._config.endpoints[path];

    const error = validateInput.validate(endpoint.data, request.getData());
    if (error) {
      const timestamp = `[${new Date().toISOString()}]`;
      console.error(timestamp, error);
      request.fail("invalid input");
      return;
    }

    endpoint.respond(request);
  }
}

module.exports = HTTPServer;
