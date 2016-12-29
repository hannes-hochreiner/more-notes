import Xhr from "./Xhr";
import { default as PubSub } from "pubsub-js";

describe("Xhr", () => {
  it("can be created and initializes", () => {
    let xhrMock = {
      open: jest.fn(),
      send: jest.fn()
    };
    let psMock = jest.genMockFromModule("pubsub-js");
    let xhr = new Xhr(xhrMock, psMock);

    expect(psMock.subscribe.mock.calls.length).toBe(1);
  });

  it("can process a get request", () => {
    let xhrMock = jest.genMockFromModule("./Xhr.mock").default;
    let psMock = jest.genMockFromModule("pubsub-js");
    let xhr = new Xhr(xhrMock, psMock);

    psMock.subscribe.mock.calls[0][1]("action.sendRequest", {
      id: 1,
      method: "GET",
      url: "some.url"
    });

    expect(xhrMock.mock.instances.length).toBe(1);
    expect(xhrMock.mock.instances[0].open.mock.calls[0]).toEqual(["GET", "some.url"]);
    expect(xhrMock.mock.instances[0].send.mock.calls[0]).toEqual([]);
    expect(xhrMock.mock.instances[0].setRequestHeader.mock.calls[0]).toEqual(["Content-type", "application/json"]);
    expect(xhrMock.mock.instances[0].withCredentials).toBe(true);
    expect(typeof xhrMock.mock.instances[0].onload).toBe("function");

    xhrMock.mock.instances[0].onload({ test: "test" });

    expect(psMock.publish.mock.calls[0]).toEqual(["event.requestCompleted.1", {
      id: 1,
      data: xhr
    }]);
  });

  it("can process a post request", () => {
    let xhrMock = jest.genMockFromModule("./Xhr.mock").default;
    let psMock = jest.genMockFromModule("pubsub-js");
    let xhr = new Xhr(xhrMock, psMock);

    psMock.subscribe.mock.calls[0][1]("action.sendRequest", {
      id: 1,
      method: "POST",
      url: "some.url",
      data: { test: "test" }
    });

    expect(xhrMock.mock.instances.length).toBe(1);
    expect(xhrMock.mock.instances[0].open.mock.calls[0]).toEqual(["POST", "some.url"]);
    expect(xhrMock.mock.instances[0].send.mock.calls[0]).toEqual([JSON.stringify({ test: "test" })]);
    expect(typeof xhrMock.mock.instances[0].onload).toBe("function");

    xhrMock.mock.instances[0].onload({ test: "test" });

    expect(psMock.publish.mock.calls[0]).toEqual(["event.requestCompleted.1", {
      id: 1,
      data: xhr
    }]);
  });

  it("produces an appropriate error message", () => {
    let xhrMock = jest.genMockFromModule("./Xhr.mock").default;
    let psMock = jest.genMockFromModule("pubsub-js");
    let xhr = new Xhr(xhrMock, psMock);

    psMock.subscribe.mock.calls[0][1]("action.sendRequest", {
      id: 1,
      method: "POST",
      url: "some.url",
      data: { test: "test" }
    });

    expect(xhrMock.mock.instances.length).toBe(1);
    expect(typeof xhrMock.mock.instances[0].onerror).toBe("function");

    xhrMock.mock.instances[0].onerror();

    expect(psMock.publish.mock.calls[0]).toEqual(["event.requestCompleted.1", {
      id: 1,
      error: xhr
    }]);
  });

  it("produces an appropriate timeout message", () => {
    let xhrMock = jest.genMockFromModule("./Xhr.mock").default;
    let psMock = jest.genMockFromModule("pubsub-js");
    let xhr = new Xhr(xhrMock, psMock);

    psMock.subscribe.mock.calls[0][1]("action.sendRequest", {
      id: 1,
      method: "POST",
      url: "some.url",
      data: { test: "test" }
    });

    expect(xhrMock.mock.instances.length).toBe(1);
    expect(typeof xhrMock.mock.instances[0].ontimeout).toBe("function");

    xhrMock.mock.instances[0].ontimeout();

    expect(psMock.publish.mock.calls[0]).toEqual(["event.requestCompleted.1", {
      id: 1,
      error: xhr
    }]);
  });

  it("produces an appropriate abort message", () => {
    let xhrMock = jest.genMockFromModule("./Xhr.mock").default;
    let psMock = jest.genMockFromModule("pubsub-js");
    let xhr = new Xhr(xhrMock, psMock);

    psMock.subscribe.mock.calls[0][1]("action.sendRequest", {
      id: 1,
      method: "POST",
      url: "some.url",
      data: { test: "test" }
    });

    expect(xhrMock.mock.instances.length).toBe(1);
    expect(typeof xhrMock.mock.instances[0].onabort).toBe("function");

    xhrMock.mock.instances[0].onabort();

    expect(psMock.publish.mock.calls[0]).toEqual(["event.requestCompleted.1", {
      id: 1,
      error: xhr
    }]);
  });
});
