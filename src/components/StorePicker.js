import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  // 创建一个react的ref引用
  myInput = React.createRef();
  // 指定react-router默认传来的props值的类型
  static propTypes = {
    history: PropTypes.object
  };

  goToStore = event => {
    // 1. Stop the form from submitting
    // 阻止form原生跳转
    event.preventDefault();
    // 2. get the text from that input
    // 通过ref获取input值
    const storeName = this.myInput.current.value;
    // 3. Change the page to /store/whatever-they-entered
    // 利用react-router默认传给组件的object，跳转到下一个react路径
    this.props.history.push(`/store/${storeName}`);
  };
  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store →</button>
      </form>
    );
  }
}

export default StorePicker;
