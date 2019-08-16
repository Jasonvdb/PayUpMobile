/**
 * Settings screen
 *
 * @format
 * @flow
 */

import React, { Fragment } from "react";
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";

class SettingsScreen extends React.Component {
  static navigationOptions = {
  	title: "Settings"
  };

  render() {
  	return (
  		<Fragment>
  			<StatusBar barStyle="dark-content"/>
  			<SafeAreaView>
  				<ScrollView
  					contentInsetAdjustmentBehavior="automatic"
  					style={styles.scrollView}
  				>
  					<View
  						style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
  					>
  						<Text>Settings Screen</Text>
  					</View>
  				</ScrollView>
  			</SafeAreaView>
  		</Fragment>
  	);
  }
}

const styles = StyleSheet.create({
	scrollView: {
		backgroundColor: Colors.lighter
	}
});

export default SettingsScreen;
