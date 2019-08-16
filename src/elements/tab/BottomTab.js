import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
	createStackNavigator,
	createAppContainer,
	createBottomTabNavigator,
	BottomTabBar
} from "react-navigation";

class BottomTab extends Component {
	render() {
		console.log(this.props);
		return <BottomTabBar {...this.props} style={styles.root}/>;
	}
}

//box-shadow: 0px -4px 14px rgba(0, 0, 0, 0.06);
const styles = StyleSheet.create({
	root: {
		borderTopColor: "#fff",
		shadowColor: "black",
		shadowOffset: { width: 0, height: -4 },
		shadowOpacity: 0.06,
		shadowRadius: 14
	},
	image: {
		borderRadius: 16,
		width: 30,
		height: 30
	}
});

export default BottomTab;
