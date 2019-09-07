import React, { Component, Fragment } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ImageBackground
} from "react-native";
import PropTypes from "prop-types";

import CtaButton from "./CtaButton";
import TabButton from "./TabButton";
import theme from "../../../config/theme";

const windowWidth = Dimensions.get("window").width;

const icons = {
  Home: "home",
  Wallet: "wallet",
  Bets: "pie-chart",
  Settings: "settings",
  NewBet: "plus"
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

    const hideCTA = activeRouteIndex !== 0;

    let rootStyle = styles.root;

    if (hideCTA) {
      rootStyle = { ...rootStyle, ...styles.filledRoot };
    }

    return (
      <View style={rootStyle}>
        <ImageBackground
          style={styles.tabImage}
          source={require("../../../../images/tab.png")}
        >
          <View style={styles.container}>
            {routes.map((route, routeIndex) => {
              const isActive = routeIndex === activeRouteIndex;

              if (routeIndex === 2 && !hideCTA) {
                //TODO move CtaButton into TabButton
                return (
                  <View
                    key={routeIndex}
                    style={{ flex: 1, display: "flex", alignItems: "center" }}
                  >
                    <CtaButton
                      onPress={this.onTabPressHandler.bind(this)}
                      onLongPress={this.onTabLongPressHandler.bind(this)}
                      getAccessibilityLabel={getAccessibilityLabel}
                      route={route}
                      hide={hideCTA}
                    />
                  </View>
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
  filledRoot: {
    backgroundColor: "#FFF"
  },
  container: {
    flexDirection: "row",
    height: theme.bottomTabHeight,
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
