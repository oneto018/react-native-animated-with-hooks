import React, { Component } from "react";
import { StyleSheet, View, Animated, Button } from "react-native";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { rotated: false };
    this.rotateAngle = Animated.Value(0);
  }

  rotate = () => {
    const { rotated } = this.state;
    Animated.spring(this.rotateAngle, { toValue: rotated ? 180 : 0 });
  };

  render() {
    const rotateTransform = rotateAngle.interpolate({
      inputRange: [0, 180],
      outputRange: ["0deg", "180deg"]
    });

    return (
      <View style={styles.container}>
        <Button
          title={rotated ? "GO BACKWARD" : "GO FORWARD"}
          onPress={() => setRotated(!rotated)}
        />
        <Animated.Image
          style={{ ...styles.main, transform: [{ rotate: rotateTransform }] }}
          source={require("./face.jpg")}
          resizeMethod="auto"
          resizeMode="center"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  main: { width: "100%", flex: 1, alignSelf: "center" }
});

export default App;
