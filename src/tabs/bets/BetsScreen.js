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
import Icon from "react-native-vector-icons/Ionicons";

import { Colors } from "react-native/Libraries/NewAppScreen";
import displayCurrency from "../../helpers/displayCurrency";
import Header from "../../elements/header/Header";
import BetCardSwipe from "./swiper/BetCardSwipe";

class BetsScreen extends Component {
  static navigationOptions = props => {
  	const { navigation, ...rest } = props;

  	return {
  		title: "Bets",
  		headerTitle: props => (
  			<Header {...props} onProfilePress={() => navigation.push("Profile")}/>
  		)
  		//subTitle: "Your balance"
  	};
  };

  render() {
  	const { navigation } = this.props;

  	return (
  		<Fragment>
  			<StatusBar barStyle="dark-content"/>
  			<SafeAreaView>
  				<View style={styles.root}>
  					<BetCardSwipe/>
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

export default BetsScreen;
