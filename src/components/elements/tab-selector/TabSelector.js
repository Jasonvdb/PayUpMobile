import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import theme from "../../../config/theme";

class TabSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0
    };
  }

  selectTab(selectedIndex) {
    const { onChange } = this.props;

    onChange(selectedIndex);

    this.setState({ selectedIndex });
  }

  render() {
    const { selectedIndex } = this.state;
    const { labels, style } = this.props;

    return (
      <View style={{ ...styles.root, ...style }}>
        {labels.map((label, index) => {
          let tabStyle = styles.tab;
          let labelStyle = styles.label;

          if (index === selectedIndex) {
            tabStyle = { ...tabStyle, ...styles.activeTab };
            labelStyle = { ...labelStyle, ...styles.activeLabel };
          }

          return (
            <TouchableOpacity
              onPress={() => this.selectTab(index)}
              key={index}
              style={tabStyle}
            >
              <Text style={labelStyle}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

TabSelector.defaultProps = {
  style: {}
};

TabSelector.propTypes = {
  labels: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object
};

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: theme.sidePadding,
    paddingRight: theme.sidePadding
  },
  tab: {
    flex: 1,
    borderBottomColor: "#E8E9EC",
    borderBottomWidth: 1
  },
  activeTab: {
    borderBottomColor: theme.brand2,
    borderBottomWidth: 2
  },
  label: {
    color: "#A6AAB4",
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 8
  },
  activeLabel: {
    color: theme.fontColor1,
    fontWeight: "500"
  }
});

export default TabSelector;
