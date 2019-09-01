import React, { Component } from "react";
import { StyleSheet } from "react-native";

import Button from "../../../elements/button/Button";

class SendButton extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onSend() {
    alert("Coming soon");
  }

  render() {
    return (
      <Button
        onPress={this.onSend.bind(this)}
        variant={"send"}
        style={styles.root}
      >
        Send
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});

export default SendButton;
