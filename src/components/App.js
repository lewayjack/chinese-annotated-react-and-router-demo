import React from "react";
import PropTypes from "prop-types";
// 引入组件
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
// 引入数据
import sampleFishes from "../sample-fishes";
// import base from "../base";

class App extends React.Component {
  // 设置组件状态，通过props传递给子组件
  state = {
    fishes: {},
    order: {}
  };

  // 指定react-router默认传来的props值的类型
  static propTypes = {
    match: PropTypes.object
  };

  // react生命周期已挂载
  componentDidMount() {
    const { params } = this.props.match;
    // first reinstate our localStorage
    // 根据存储id判断是否从本地存储读取数据，并保存在App的state
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    // 操作firebase 国内上不了
    // this.ref = base.syncState(`${params.storeId}/fishes`, {
    //   context: this,
    //   state: "fishes"
    // });
  }

  // 组件更新后，存储sate到localStorage
  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    // base.removeBinding(this.ref);
  }

  // 操作state 之 增
  addFish = (fish) => {
    // 1. Take a copy of the existing state
    // 利用es6 rest语法拷贝当前state（一个对象）
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    this.setState({ fishes });
  };

  // 操作state 之 改
  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. Update that state
    fishes[key] = updatedFish;
    // 3. Set that to state
    this.setState({ fishes });
  };

  // 操作state 之 删
  deleteFish = key => {
    // 1. take a copy of state
    const fishes = { ...this.state.fishes };
    // 2. update the state
    fishes[key] = null;
    // 3.  update state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    // 1. take a copy of state
    const order = { ...this.state.order };
    // 2. Either add to the order, or update the number in our order
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to update our state object
    this.setState({ order });
  };

  removeFromOrder = key => {
    // 1. take a copy of state
    const order = { ...this.state.order };
    // 2. remove that itemf from order
    delete order[key];
    // 3. Call setState to update our state object
    this.setState({ order });
  };

  // 需要渲染的内容
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          {/* 此处引用组件 自封闭html标签 利用props技术传值 */}
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {/* 利用对象的key遍历对象 */}
            {/* jsx语法中 {}内的内容被视为js */}
            {Object.keys(this.state.fishes).map(key => (
              // key作为react快速找到列表改变的地方的标识
              // 但是组件内部获取不到key，所以另需要index
              // props 传入增state内容 和 传入增state方法
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
