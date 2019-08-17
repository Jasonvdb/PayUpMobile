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
import BetCardSwipe from "../bets/swiper/BetCardSwipe";

class HomeScreen extends Component {
  static navigationOptions = props => {
  	const { navigation, ...rest } = props;

  	const value = navigation.getParam("walletValue", "");
  	const subTitle = navigation.getParam("subTitle", "");
  	return {
  		title: value ? displayCurrency(value) : null,
  		headerTitle: props => (
  			<Header
  				{...props}
  				subTitle={subTitle}
  				onProfilePress={() => navigation.push("Profile")}
  				animate={!!value}
  			/>
  		)
  	};
  };

  componentDidMount(): void {
  	const { navigation } = this.props;
  	setTimeout(() => {
  		navigation.setParams({ walletValue: 0.000697, subTitle: "Your balance" });
  	}, 1000);
  }

  render() {
  	const { navigation } = this.props;

  	return (
  		<Fragment>
  			<StatusBar barStyle="dark-content"/>
  			<SafeAreaView>
  				<View style={styles.root}>
  					<BetCardSwipe/>

  					<ScrollView
  						contentInsetAdjustmentBehavior="automatic"
  						style={styles.scrollView}
  					>
  						{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(index => (
  							<View
  								key={index}
  								style={{
  									width: "100%",
  									height: 40,
  									marginTop: 20,
  									backgroundColor: "rgba(238,234,244,0.3)",
  									borderRadius: 8
  								}}
  							/>
  						))}
  					</ScrollView>
  				</View>
  			</SafeAreaView>
  		</Fragment>
  	);
  }
}

const styles = StyleSheet.create({
	root: {
		height: "100%"
	},
	scrollView: {
		backgroundColor: "#fff",
		paddingLeft: 15,
		paddingRight: 15
	}
});

export default HomeScreen;
