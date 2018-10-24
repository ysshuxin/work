import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import Header from "../../common/header";
import Footer from "../../common/footer";
import { LocaleProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import "moment/locale/zh-cn";

export default class App extends Component {
  render() {
    return (
      <LocaleProvider locale={zh_CN}>
        <div>
          <Header />

          <Footer />
        </div>
      </LocaleProvider>
    );
  }
}
