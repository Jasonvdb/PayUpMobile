import React from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import TxIcon from "./TxIcon";
import displayCurrency from "../../../helpers/displayCurrency";
import theme from "../../../config/theme";
import moment from "moment";
import Button from "../../elements/button/Button";
import settings from "../../../config/settings";

const ReceiveSlideUp = props => {
  const { address } = props;

  return <View/>;
};

ReceiveSlideUp.propTypes = {};

const styles = StyleSheet.create({
  root: {}
});

export default ReceiveSlideUp;
