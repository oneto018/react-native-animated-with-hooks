//@ts-check
import React, { Component, useState, useEffect, useRef } from "react";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  Button
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { useSpring, useGesture } from "./hooks/useSpring";

const App = ({}) => {
  const { x: xVal, y: yVal, bind, endVelocity, isDown } = useGesture();

  useSpring({
    value: xVal,
    toValue: isDown ? false : 0
  });

  useSpring({
    value: yVal,
    toValue: isDown ? false : 0
  });

  return (
    <View style={styles.container}>
      <Button title="start" onPress={() => {}} />

      <PanGestureHandler {...bind()}>
        <Animated.View
          style={{
            ...styles.box1,
            transform: [{ translateX: xVal }, { translateY: yVal }]
          }}
        />
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  box1: {
    height: 100,
    width: 100,
    backgroundColor: "blue",
    borderRadius: 10
  }
});

export default App;
