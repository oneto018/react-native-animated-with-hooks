//@ts-check
import React, { useState, Fragment } from "react";
import { StyleSheet, View, Animated, Button, Text } from "react-native";
import { useSpring, useGesture } from "../hooks/useSpring";
import { PanGestureHandler } from "react-native-gesture-handler";

const item = {
  backgroundColor: "blue",
  text: "Wake Up",
  id: 1
};

function App() {
  const { bind, x, y, endVelocity, isDown } = useGesture();

  const rotation = x.interpolate({
    inputRange: [0, 200],
    outputRange: ["0deg", "45deg"]
  });

  useSpring({ value: x, toValue: isDown ? false : 0 });
  useSpring({ value: y, toValue: isDown ? false : 0 });

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <PanGestureHandler {...bind()}>
          <Animated.View
            style={{
              ...styles.card,
              backgroundColor: item.backgroundColor,
              transform: [
                { translateX: x },
                { translateY: y },
                { rotate: rotation }
              ]
            }}
          >
            <Text style={[styles.mainText, { color: item.color || "#fff" }]}>
              {item.text}
            </Text>
            <Text style={styles.smallText}>
              velocity: {JSON.stringify(endVelocity)}
            </Text>
          </Animated.View>
        </PanGestureHandler>
      </View>
      <View style={styles.bottomView}>
        <Button title="Todo(0)" onPress={() => {}} color="steelblue" />
        <Button title="Done(0)" onPress={() => {}} color="green" />
        <Button title="Postponed(0)" onPress={() => {}} color="#0048BA" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  main: {
    width: "100%",

    flex: 1,
    alignSelf: "center"
  },
  bottomView: {
    width: "100%",
    flex: 0.3,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  smallText: { color: "#fff", fontSize: 15, textAlign: "center" },
  mainText: { textAlign: "center", color: "#fff", fontSize: 35 }
});

export default App;
