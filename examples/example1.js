import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Animated, Button } from "react-native";
import { useSpring } from "../hooks/useSpring";

function App() {
  const [rotated, setRotated] = useState(false);
  const rotateAngle = useSpring({ toValue: rotated ? 180 : 0 });
  //   const { current: rotateAngle } = useRef(new Animated.Value(0));

  //   useEffect(() => {
  //     Animated.spring(rotateAngle, {
  //       toValue: rotated ? 180 : 0,
  //       useNativeDriver: true
  //     }).start();
  //   }, [rotated]);

  const rotateTransform = rotateAngle.interpolate({
    inputRange: [0, 90],
    outputRange: ["0deg", "90deg"]
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  main: { width: "100%", flex: 1, alignSelf: "center" }
});

export default App;
