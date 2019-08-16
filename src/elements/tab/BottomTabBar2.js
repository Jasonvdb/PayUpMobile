import React, { Fragment } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	SafeAreaView,
	ImageBackground
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const tabWidth = windowWidth / 4;

const styles = StyleSheet.create({
	root: {
		//borderWidth: 1,
		// borderStyle: "solid",
		// borderColor: "red",
		backgroundColor: "transparent",
		shadowColor: "black",
		shadowOffset: { width: 0, height: -14 },
		shadowOpacity: 0.06,
		shadowRadius: 14

		//transform: [{ translate: [21.5, 27.5] }]

		//transform: [{ translate: [21.5, 27.5], scale: [-1, 1] }]
		//transform: [{ matrix: [1, 0, 0, -1, 0, 0, 0, 0, 0] }]
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
		//backgroundColor: "#e9e9e9",
		height: "100%"
	},
	ctaButton: {
		top: -37,
		backgroundColor: "#00239C",
		width: 56,
		height: 56,
		borderRadius: 35,
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	tabImage: {
		width: windowWidth,
		resizeMode: "center"

		// backgroundColor: "#fff",
		// shadowColor: "black",
		// shadowOffset: { width: 0, height: -14 },
		// shadowOpacity: 0.08,
		// shadowRadius: 14
	}
});

const CtaButton = props => (
	<TouchableOpacity style={styles.ctaButton}>
		<Text style={{ color: "#FFF" }}>CTA</Text>
	</TouchableOpacity>
);

const BottomTabBar2 = props => {
	const {
		renderIcon,
		activeTintColor,
		inactiveTintColor,
		onTabPress,
		onTabLongPress,
		getAccessibilityLabel,
		navigation
	} = props;

	const { routes, index: activeRouteIndex } = navigation.state;

	return (
		<SafeAreaView>
			<View style={styles.root}>
				<ImageBackground
					style={styles.tabImage}
					source={require("../../../images/tab.png")}
				>
					<View style={styles.container}>
						{routes.map((route, routeIndex) => {
							console.log(route);
							const isRouteActive = routeIndex === activeRouteIndex;
							const tintColor = isRouteActive
								? activeTintColor
								: inactiveTintColor;

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
										accessibilityLabel={getAccessibilityLabel({ route })}
									>
										<View>
											{renderIcon({ route, focused: isRouteActive, tintColor })}

											<Text style={{ textAlign: "center" }}>{route.key}</Text>
											{/*{renderIcon({ route, focused: isRouteActive, tintColor })}*/}
										</View>
									</TouchableOpacity>
								</Fragment>
							);
						})}
					</View>
				</ImageBackground>
			</View>
		</SafeAreaView>
	);
};

export default BottomTabBar2;
