// 使用jsx就需要引入react
import React from "react";
import PropTypes from "prop-types";

// 当组件仅仅使用jsx作为模板时，不需继承react component，简单的函数就可以做到
// return 后只能有一行代码，为了合理的jsx书写规范，使用小括号包裹()
// 简单函数没有props属性，使用参数传入
const Header = (props) => (
  <header className="top">
    <h1>
      Catch
      <span className="ofThe">
        <span className="of">Of</span>
        <span className="the">The</span>
      </span>
      Day
    </h1>
    <h3 className="tagline">
      <span>{props.tagline}</span>
    </h3>
  </header>
);

Header.propTypes = {
  tagline: PropTypes.string.isRequired
};

export default Header;
