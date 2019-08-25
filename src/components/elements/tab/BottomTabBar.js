import React, { Component, Fragment } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	SafeAreaView,
	ImageBackground
} from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import PropTypes from "prop-types";

import theme from "../../../config/theme";
import CtaButton from "./CtaButton";
import TabButton from "./TabButton";

const windowWidth = Dimensions.get("window").width;

const icons = {
	Home: "home",
	Wallet: "wallet",
	Bets: "pie-chart",
	Settings: "settings"
};

class BottomTabBar extends Component {
	onTabPressHandler(route) {
		const { onTabPress } = this.props;
		onTabPress({ route });
	}

	onTabLongPressHandler(route) {
		const { onTabLongPress } = this.props;
		onTabLongPress({ route });
	}

	render() {
		const {
			getAccessibilityLabel,
			onTabPress,
			onTabLongPress,
			navigation
		} = this.props;

		const { routes, index: activeRouteIndex } = navigation.state;

		return (
			<View style={styles.root}>
				<ImageBackground
					style={styles.tabImage}
					source={require("../../../../images/tab.png")}
				>
					<View style={styles.container}>
						{routes.map((route, routeIndex) => {
							const isActive = routeIndex === activeRouteIndex;
							if (routeIndex === 2) {
								return (
									<CtaButton
										key={routeIndex}
										onPress={this.onTabPressHandler.bind(this)}
										onLongPress={this.onTabLongPressHandler.bind(this)}
										getAccessibilityLabel={getAccessibilityLabel}
										route={route}
										isActive={isActive}
									/>
								);
							}

							return (
								<TabButton
									key={routeIndex}
									onPress={this.onTabPressHandler.bind(this)}
									onLongPress={this.onTabLongPressHandler.bind(this)}
									getAccessibilityLabel={getAccessibilityLabel}
									route={route}
									iconString={icons[route.key]}
									isActive={isActive}
								/>
							);
						})}
					</View>
				</ImageBackground>
				<SafeAreaView/>
			</View>
		);
	}
}

BottomTabBar.propTypes = {
	onTabPress: PropTypes.func.isRequired,
	onTabLongPress: PropTypes.func.isRequired,
	getAccessibilityLabel: PropTypes.func.isRequired,
	navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
	root: {
		backgroundColor: "transparent",
		shadowColor: "black",
		shadowOffset: { width: 0, height: -14 },
		shadowOpacity: 0.06,
		shadowRadius: 14,
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0
	},
	container: {
		flexDirection: "row",
		height: 60,
		elevation: 2,
		alignItems: "center"
	},
	tabButton: {
		flex: 1,
		display: "flex",
		justifyContent: "center",
		height: "100%",
		alignItems: "center"
	},
	tabImage: {
		width: windowWidth,
		resizeMode: "center"
	}
});

export default BottomTabBar;
