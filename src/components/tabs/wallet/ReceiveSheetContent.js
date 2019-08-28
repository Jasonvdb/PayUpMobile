import React from "react";
import { StyleSheet, View, Text } from "react-native";
// import QRCode from "react-native-qrcode-svg";

const ReceiveSheetContent = props => {
  const { address } = props;

  return (
    <View>
      <Text>address here</Text>

      {/*<QRCode value="http://awesome.link.qr"/>*/}
    </View>
  );
};

ReceiveSheetContent.propTypes = {};

const styles = StyleSheet.create({
  root: {}
});

export default ReceiveSheetContent;
