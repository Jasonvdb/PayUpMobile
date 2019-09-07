import React, { Component } from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";

import Button from "../../../elements/button/Button";

const SendButton = ({ onPress }) => {
  return (
    <Button onPress={onPress} variant={"send"} style={styles.root}>
      Send
    </Button>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});

SendButton.propTypes = {
  onPress: PropTypes.func.isRequired
};

export default SendButton;
