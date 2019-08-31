import React from "react";
import { StyleSheet, View, Text } from "react-native";
// import QRCode from "react-native-qrcode";

const ReceiveSheetContent = props => {
  const { address } = props;

  return (
    <View>
      <Text>address here</Text>
      {/*<QRCode value={"Test"} size={200} bgColor="purple" fgColor="white"/>*/}
    </View>
  );
};

ReceiveSheetContent.propTypes = {};

const styles = StyleSheet.create({
  root: {}
});

export default ReceiveSheetContent;
