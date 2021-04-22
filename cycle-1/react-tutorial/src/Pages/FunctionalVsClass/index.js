import React from "react";

import ProfilePageFunction from "./ProfilePageFunction";
import ProfilePageClass from "./ProfilePageClass";

class FunctionVsClass extends React.Component {
  state = {
    user: "sungkwang",
  };
  render() {
    return (
      <>
        <label>
          <b>Choose profile to view: </b>
          <select
            value={this.state.user}
            onChange={(e) => this.setState({ user: e.target.value })}
          >
            <option value="jaesub">재섭</option>
            <option value="heejun">희준</option>
            <option value="sanghun">상훈</option>
            <option value="dongjoo">동주</option>
            <option value="sungkwang">성광</option>
          </select>
        </label>
        <h1>Welcome to {this.state.user}’s profile!</h1>
        <p>
          <ProfilePageFunction user={this.state.user} />
          <b> (function)</b>
        </p>
        <p>
          <ProfilePageClass user={this.state.user} />
          <b> (class)</b>
        </p>
        <p>Can you spot the difference in the behavior?</p>
      </>
    );
  }
}
export default FunctionVsClass;
