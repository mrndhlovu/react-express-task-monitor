import { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const portalRoot = document.getElementById("portal");

class UIPortal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    portalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    portalRoot.removeChild(this.el);
  }

  render() {
    const { children } = this.props;
    return createPortal(children, this.el);
  }
}

UIPortal.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UIPortal;
