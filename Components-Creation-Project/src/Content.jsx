import React, { Component } from "react";

let user = { id: 1, compo: "class" };

let { id, comp } = user;

export default class Content extends Component {
  render() {
    return <div>Content</div>;
  }
}
