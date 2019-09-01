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
	StatusBar,
	Button
} from "react-native";

import Header from "../../elements/header/Header";

class SettingsScreen extends React.Component {
  static navigationOptions = props => {
  	const { navigation, ...rest } = props;

  	return {
  		title: "Settings",
  		headerTitle: props => (
  			<Header {...props} onProfilePress={() => navigation.push("Profile")}/>
  		)
  	};
  };

  render() {
  	const { navigation } = this.props;

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

  						<Button
  							title="Profile"
  							onPress={() => navigation.navigate("Profile")}
  						/>
  					</View>
  				</ScrollView>
  			</SafeAreaView>
  		</Fragment>
  	);
  }
}

const styles = StyleSheet.create({
	scrollView: {
		// backgroundColor: Colors.lighter
	}
});

export default SettingsScreen;
