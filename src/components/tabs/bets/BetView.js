/**
 * Home screen with bets and transaction summary
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
import Header from "../../elements/header/Header";

class BetView extends Component {
  static navigationOptions = props => {
  	const { navigation, ...rest } = props;

  	return {
  		title: "BetView",
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
  				<View style={styles.root}>
  					<Text>Bet...</Text>
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

export default BetView;
