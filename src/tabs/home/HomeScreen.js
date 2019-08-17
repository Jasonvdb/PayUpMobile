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

class HomeScreen extends Component {
  static navigationOptions = props => {
  	const { navigation, ...rest } = props;

  	const value = navigation.getParam("walletValue", null);
  	return {
  		title: value ? displayCurrency(value) : "AppSats",
  		headerTitle: props => (
  			<Header {...props} onProfilePress={() => navigation.push("Profile")}/>
  		)
  		//subTitle: "Your balance"
  	};
  };

  componentDidMount(): void {
  	setTimeout(() => {
  		this.props.navigation.setParams({ walletValue: 0.000097 });
  	}, 1000);
  }

  render() {
  	const { navigation } = this.props;

  	return (
  		<Fragment>
  			<StatusBar barStyle="dark-content"/>
  			<SafeAreaView>
  				<View style={styles.root}>
  					<View style={styles.betCardContainer}>
  						<Text>Bet cards swiping...</Text>
  					</View>

  					<ScrollView
  						contentInsetAdjustmentBehavior="automatic"
  						style={styles.scrollView}
  					>
  						<View
  							style={{
  								alignItems: "center",
  								justifyContent: "center"
  							}}
  						>
  							<Button
  								style={{ marginTop: 40 }}
  								title="Make bet"
  								onPress={() => alert("TODO")}
  							/>

  							{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(index => (
  								<View
  									key={index}
  									style={{
  										width: "100%",
  										height: 20,
  										marginTop: 30,
  										backgroundColor: "#afcaff"
  									}}
  								/>
  							))}
  						</View>
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
	betCardContainer: {
		//backgroundColor: "#909090"
	},
	scrollView: {
		backgroundColor: "#fff"
	}
});

export default HomeScreen;
