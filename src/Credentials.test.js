import Credentials from "./Credentials";
import { default as PubSub } from "pubsub-js";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactTestUtils from 'react-addons-test-utils';
import { mount } from 'enzyme';

injectTapEventPlugin();

class AppContext extends Component {
  getChildContext() {
    return {
      pubsub: this.props.ps
    };
  }

  render() {
    return this.props.children || null;
  }
}

AppContext.childContextTypes = {
  pubsub: React.PropTypes.object
};

describe("Credentials", () => {
  it("supports entering credentials", () => {
    let psMock = jest.genMockFromModule("pubsub-js");
    const wrapper = mount(
      <AppContext ps={psMock}>
        <MuiThemeProvider>
          <Credentials/>
        </MuiThemeProvider>
      </AppContext>
    );

    expect(psMock.subscribe.mock.calls.length).toBe(1);
    psMock.subscribe.mock.calls[0][1]("action.getCredentials", {
      id: 1,
      title: "some title"
    });
    expect(wrapper.find("Dialog").props().title).toBe("some title");
    wrapper.find("Dialog").node.props.children
      .find((c) => c.props.floatingLabelText === "User")
      .props.onChange({ target: { value: "tuser" } });
    wrapper.find("Dialog").node.props.children
      .find((c) => c.props.floatingLabelText === "Password")
      .props.onChange({ target: { value: "tpass" } });
    wrapper.find("Dialog").node.props.actions
      .find((c) => c.props.label === "Ok")
      .props.onTouchTap();
    expect(psMock.publish.mock.calls[0]).toEqual([
      "event.credentialsObtained.1",
      {
        id: 1,
        data: { user: "tuser", password: "tpass" }
      }
    ]);
  });

  it("supports cancellation", () => {
    let psMock = jest.genMockFromModule("pubsub-js");
    const wrapper = mount(
      <AppContext ps={psMock}>
        <MuiThemeProvider>
          <Credentials/>
        </MuiThemeProvider>
      </AppContext>
    );

    expect(psMock.subscribe.mock.calls.length).toBe(1);
    psMock.subscribe.mock.calls[0][1]("action.getCredentials", {
      id: 1,
      title: "some title"
    });
    expect(wrapper.find("Dialog").props().title).toBe("some title");
    wrapper.find("Dialog").node.props.children
      .find((c) => c.props.floatingLabelText === "User")
      .props.onChange({ target: { value: "tuser" } });
    wrapper.find("Dialog").node.props.children
      .find((c) => c.props.floatingLabelText === "Password")
      .props.onChange({ target: { value: "tpass" } });
    wrapper.find("Dialog").node.props.actions
      .find((c) => c.props.label === "Cancel")
      .props.onTouchTap();
    expect(psMock.publish.mock.calls[0]).toEqual([
      "event.credentialsObtained.1",
      {
        id: 1,
        error: "Action cancelled."
      }
    ]);
  });

  it("supports entering multiple credentials", () => {
    let psMock = jest.genMockFromModule("pubsub-js");
    const wrapper = mount(
      <AppContext ps={psMock}>
        <MuiThemeProvider>
          <Credentials/>
        </MuiThemeProvider>
      </AppContext>
    );

    expect(psMock.subscribe.mock.calls.length).toBe(1);
    psMock.subscribe.mock.calls[0][1]("action.getCredentials", {
      id: 1,
      title: "some title"
    });
    psMock.subscribe.mock.calls[0][1]("action.getCredentials", {
      id: 2,
      title: "some other title"
    });
    expect(wrapper.find("Dialog").props().title).toBe("some title");
    wrapper.find("Dialog").node.props.children
      .find((c) => c.props.floatingLabelText === "User")
      .props.onChange({ target: { value: "tuser" } });
    wrapper.find("Dialog").node.props.children
      .find((c) => c.props.floatingLabelText === "Password")
      .props.onChange({ target: { value: "tpass" } });
    wrapper.find("Dialog").node.props.actions
      .find((c) => c.props.label === "Ok")
      .props.onTouchTap();
    expect(psMock.publish.mock.calls[0]).toEqual([
      "event.credentialsObtained.1",
      {
        id: 1,
        data: { user: "tuser", password: "tpass" }
      }
    ]);
    expect(wrapper.find("Dialog").props().title).toBe("some other title");
    expect(wrapper.find("Dialog").node.props.children
      .find((c) => c.props.floatingLabelText === "User").props.value).toBe("");
    expect(wrapper.find("Dialog").node.props.children
      .find((c) => c.props.floatingLabelText === "Password").props.value).toBe("");
    wrapper.find("Dialog").node.props.children
      .find((c) => c.props.floatingLabelText === "User")
      .props.onChange({ target: { value: "t2user" } });
    wrapper.find("Dialog").node.props.children
      .find((c) => c.props.floatingLabelText === "Password")
      .props.onChange({ target: { value: "t2pass" } });
    wrapper.find("Dialog").node.props.actions
      .find((c) => c.props.label === "Ok")
      .props.onTouchTap();
    expect(psMock.publish.mock.calls[1]).toEqual([
      "event.credentialsObtained.2",
      {
        id: 2,
        data: { user: "t2user", password: "t2pass" }
      }
    ]);
  });
});
