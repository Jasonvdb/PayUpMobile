import React, { Fragment } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	SafeAreaView,
	ImageBackground
} from "react-native";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import IonIcon from "react-native-vector-icons/Ionicons";
import theme from "../../config/theme";

const windowWidth = Dimensions.get("window").width;

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
	ctaButton: {
		top: -37,
		backgroundColor: theme.brand1,
		width: 56,
		height: 56,
		borderRadius: 35,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 4,

		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.35,
		shadowRadius: 12,
		shadowColor: theme.brand1
	},
	tabImage: {
		width: windowWidth,
		resizeMode: "center"
	}
});

const icons = {
	Home: "home",
	Wallet: "wallet",
	Bets: "pie-chart",
	Settings: "settings"
};

const CtaButton = () => (
	<TouchableOpacity style={styles.ctaButton}>
		<IonIcon name={"ios-add"} size={35} color={"#FFF"}/>
	</TouchableOpacity>
);

const BottomTabBar = props => {
	const { onTabPress, onTabLongPress, getAccessibilityLabel, navigation } = props;

	const { routes, index: activeRouteIndex } = navigation.state;

	return (
		<View style={styles.root}>
			<ImageBackground
				style={styles.tabImage}
				source={require("../../../images/tab.png")}
			>
				<View style={styles.container}>
					{routes.map((route, routeIndex) => {
						const isRouteActive = routeIndex === activeRouteIndex;

						return (
							<Fragment key={routeIndex}>
								{routeIndex === 2 ? <CtaButton/> : null}
								<TouchableOpacity
									style={styles.tabButton}
									onPress={() => {
										onTabPress({ route });
									}}
									onLongPress={() => {
										onTabLongPress({ route });
									}}
									accessibilityLabel={getAccessibilityLabel({
										route
									})}
								>
									<SimpleLineIcon
										name={icons[route.key]}
										size={25}
										color={isRouteActive ? theme.brand1 : theme.disabled1}
									/>
								</TouchableOpacity>
							</Fragment>
						);
					})}
				</View>
			</ImageBackground>
			<SafeAreaView/>
		</View>
	);
};

export default BottomTabBar;
