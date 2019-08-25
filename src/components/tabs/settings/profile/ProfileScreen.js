/**
 * Profile screen
 *
 * @format
 * @flow
 */

import React, { Component, Fragment } from "react";
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar,
	Button
} from "react-native";

class ProfileScreen extends Component {
  static navigationOptions = props => {
  	const { navigation, ...rest } = props;

  	return {
  		title: "Profile"
  	};
  };

  render() {
  	const { navigation } = this.props;

  	return (
  		<Fragment>
  			<StatusBar barStyle="dark-content"/>
  			<SafeAreaView>
  				<View style={styles.root}>
  					<Text>Profile TODO</Text>
  				</View>
  			</SafeAreaView>
  		</Fragment>
  	);
  }
}

const styles = StyleSheet.create({
	root: {
		height: "100%"
	}
});

export default ProfileScreen;
