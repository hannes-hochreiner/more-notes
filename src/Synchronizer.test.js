import Synchronizer from "./Synchronizer";
import { default as PubSub } from "pubsub-js";
import { RepoPouchDb as Repo } from "./RepoPouchDb";

describe("Synchronizer", () => {
  it("can be created and initializes", () => {
    let psMock = jest.genMockFromModule("pubsub-js");
    let repoMock = {};
    let rsPromise = new Promise((rs, rj) => { rs(); });
    repoMock.syncDb = jest.fn().mockReturnValueOnce(rsPromise);
    let uuidMock = jest.fn().mockReturnValueOnce(1);
    let sync = new Synchronizer(repoMock, psMock, uuidMock);

    expect(psMock.subscribe.mock.calls.length).toBe(1);
    expect(psMock.subscribe.mock.calls[0][0]).toBe("action.syncDb");
    let db = {
      title: "testTitle",
      _id: "1",
      syncAddr: "https://sync",
      authAddr: "https://auth"
    };

    psMock.subscribe.mock.calls[0][1]("action.syncDb", {
      id: 1,
      db: db
    });

    return new Promise((rs, rj) => {
      psMock.publish.mockImplementationOnce(() => { rs(); });
    }).then(() => {
      expect(repoMock.syncDb.mock.calls[0]).toEqual([db]);
      expect(psMock.publish.mock.calls.length).toBe(1);
      expect(psMock.publish.mock.calls[0]).toEqual([
        "event.dbSyncCompleted.1",
        { id: 1 }
      ]);
    });
  });

  it("can authenticate", () => {
    let psMock = jest.genMockFromModule("pubsub-js");
    let repoMock = {};
    let rjPromise = new Promise((rs, rj) => { rj(); });
    let rsPromise = new Promise((rs, rj) => { rs(); });
    repoMock.syncDb = jest.fn().mockReturnValueOnce(rjPromise)
      .mockReturnValueOnce(rsPromise);
    let uuidMock = jest.fn().mockReturnValueOnce(1)
      .mockReturnValueOnce(2);
    let sync = new Synchronizer(repoMock, psMock, uuidMock);

    expect(psMock.subscribe.mock.calls.length).toBe(1);
    expect(psMock.subscribe.mock.calls[0][0]).toBe("action.syncDb");
    let db = {
      title: "testTitle",
      _id: "1",
      syncAddr: "https://sync",
      authAddr: "https://auth"
    };
    psMock.subscribe.mock.calls[0][1]("action.syncDb", {
      id: 1,
      db: db
    });

    return new Promise((rs, rj) => {
      psMock.publish.mockImplementationOnce(() => { rs(); });
    }).then(() => {
      expect(repoMock.syncDb.mock.calls[0]).toEqual([db]);
      expect(psMock.publish.mock.calls.length).toBe(1);
      expect(psMock.publish.mock.calls[0]).toEqual([
        "action.getCredentials",
        { id: 1, title: "testTitle" }
      ]);

      let prom = new Promise((rs, rj) => {
        psMock.publish.mockImplementationOnce(() => { rs(); });
      });

      psMock.subscribe.mock.calls[1][1]("event.credentialsObtained.1", {
        id: 1,
        data: { user: "testUser", password: "testPassword" }
      });

      return prom;
    }).then(() => {
      expect(psMock.publish.mock.calls[1]).toEqual([
        "action.sendRequest",
        {
          id: 2,
          method: "POST",
          url: "https://auth",
          data: {"name":"testUser","password":"testPassword"}
        }
      ]);
      expect(psMock.subscribe.mock.calls[2][0]).toBe("event.requestCompleted.2");

      let prom = new Promise((rs, rj) => {
        psMock.publish.mockImplementationOnce(() => { rs(); });
      });

      psMock.subscribe.mock.calls[2][1]("event.requestCompleted.2", {
        id: 2,
        data: {}
      });

      return prom;
    }).then(() => {
      expect(psMock.publish.mock.calls[2]).toEqual([
        "event.dbSyncCompleted.1",
        { id: 1}
      ]);
    });
  });
});
