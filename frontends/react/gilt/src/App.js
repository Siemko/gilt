import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { translate } from "react-i18next";

class App extends Component {
  state = {
    message: "Startowa wiadomość..."
  };
  async componentDidMount() {
    let res = await fetch(
      `//localhost:5000/translate?culture=${this.props.i18n.language}`
    );
    let message = await res.json();
    this.setState({ message });
  }

  render() {
    const { t } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            {t("message")}
            {this.state.message}
          </h1>
        </header>
      </div>
    );
  }
}

export default translate("translations")(App);
