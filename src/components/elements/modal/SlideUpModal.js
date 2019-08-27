import React, { Component } from "react";
import { Modal, Text, TouchableHighlight, View, Alert } from "react-native";

class SlideUpModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false
    };
  }

  componentDidMount(): void {
    setTimeout(() => this.setState({ modalVisible: true }), 300);
  }

  render() {
    const { modalVisible } = this.state;
    console.log(modalVisible);
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
        presentationStyle={"formSheet"}
      >
        <View style={{ backgroundColor: "#ff7c72", flex: 1 }}>
          <View>
            <Text>Hello World!</Text>
          </View>
        </View>
      </Modal>
    );
  }
}

export default SlideUpModal;
