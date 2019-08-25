import { Alert } from "react-native";

export default (e, message) => {
  console.error(e);
  Alert.alert(
    "Erro",
    message,
    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    { cancelable: false }
  );
};
