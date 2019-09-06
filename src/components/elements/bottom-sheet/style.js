import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.36)"
  },
  mask: {
    flex: 1,
    backgroundColor: "transparent"
  },
  container: {
    backgroundColor: "#fff",
    width: "100%",
    height: 0,
    //overflow: "hidden",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,

    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 7
  },
  dragBarContainer: {
    backgroundColor: "transparent",
    height: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  dragBar: {
    width: 80,
    height: 5,
    backgroundColor: "#D6D9E4",
    borderRadius: 10
  }
});

export default styles;
