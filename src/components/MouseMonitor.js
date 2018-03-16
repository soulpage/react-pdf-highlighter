// @flow

import React, { Component } from "react";

type Props = {
  onMoveAway: () => void,
  paddingX: number,
  paddingY: number,
  children: React$Element<*>
};

class MouseMonitor extends Component<Props> {
  container: ?HTMLDivElement;

  onMouseMove = (event: MouseEvent) => {
    if (!this.container) {
      return;
    }

    const { onMoveAway, paddingX, paddingY } = this.props;

    const { clientX, clientY } = event;

    // TODO: see if possible to optimize
    const { left, top, width, height } = this.container.getBoundingClientRect();

    const inBoundsX =
      clientX > left - paddingX && clientX < left + width + paddingX;
    const inBoundsY =
      clientY > top - paddingY && clientY < top + height + paddingY;

    const isNear = inBoundsX && inBoundsY;

    if (!isNear) {
      onMoveAway();
    }
  };

  componentDidMount() {
    document.addEventListener("mousemove", this.onMouseMove);
  }

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.onMouseMove);
  }

  render() {
    // eslint-disable-next-line
    const { onMoveAway, paddingX, paddingY, ...restProps } = this.props;

    return (
      <div ref={node => (this.container = node)}>
        {React.cloneElement(this.props.children, restProps)}
      </div>
    );
  }
}

export default MouseMonitor;