import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";
// react动画组件
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
  };
  // 当组件中有一部分内容需要循环时 除了再抽出一个小组件 ，也可以另写一个方法来渲染
  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === "available";
    // 配置动画参数以便复用
    // 需要注意的是CSSTransition的类名是 classNames，多个s
    const transitionOptions = {
      classNames: "order",
      key,
      timeout: { enter: 500, exit: 500 }
    };
    // Make sure the fish is loaded before we continue!
    // 渲染空内容的时候
    if (!fish) return null;

    // 根据state的值来确定渲染内容
    if (!isAvailable) {
      return (
        // 解构传入动画参数
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry {fish ? fish.name : "fish"} is no longer available
          </li>
        </CSSTransition>
      );
    }

    // state正常时的渲染内容
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
          {/* TransitionGroup 可以生成标签 */}
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 500, exit: 500 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            {formatPrice(count * fish.price)}
            {/* 调用props传入的方法，删除state的内容 */}
            <button onClick={() => this.props.removeFromOrder(key)}>
              &times;
            </button>
          </span>
        </li>
      </CSSTransition>
    );
  };
  render() {
    const orderIds = Object.keys(this.props.order);
    // 计算总价格
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === "available";
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);
    // 返回要渲染的order内容
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {/* 此处调用上述方法循环渲染 */}
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
