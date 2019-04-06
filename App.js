//@ts-check
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, useState, useEffect, useRef } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  Button
} from "react-native";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on you keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

const x = new Animated.Value(0);

x.addListener(function({ value }) {
  console.log("x s listener", value);
});

let App;

export default (App = () => {
  const [left, setLeft] = useState(true);
  const value = useRef(new Animated.Value(0));
  const initialValueX = useRef(new Animated.Value(0));
  const initialValueY = useRef(new Animated.Value(0));
  const xValue = useRef(new Animated.Value(0));
  const yValue = useRef(new Animated.Value(0));

  xValue.current.addListener(function({ value }) {
    console.log("arguments for xv outside", value);
  });

  const [diffX, diffY] = [
    Animated.subtract(xValue.current, initialValueX.current),
    Animated.subtract(yValue.current, initialValueY.current)
  ];

  const initialTimestamp = useRef(0);

  console.log("redering2");
  useEffect(() => {
    Animated.spring(value.current, {
      toValue: left ? 0.0 : 200.0,
      damping: 80,
      stiffness: 100,
      useNativeDriver: true
    }).start();
  }, [left]);

  return (
    <View style={styles.container}>
      <Button
        title={left ? "move rightx " : "move left"}
        onPress={() => {
          setLeft(!left);
        }}
      />

      <Animated.View
        onStartShouldSetResponder={evt => {
          initialValueX.current = new Animated.Value(evt.nativeEvent.pageX);
          initialValueY.current = new Animated.Value(evt.nativeEvent.pageY);
          xValue.current = new Animated.Value(evt.nativeEvent.pageX);
          yValue.current = new Animated.Value(evt.nativeEvent.pageY);

          initialTimestamp.current = evt.nativeEvent.timestamp;

          console.log("animation starts");
          return true;
        }}
        onResponderMove={evt => {
          // Animated.event(
          //   [
          //     {
          //       nativeEvent: {
          //         pageX: xValue.current,
          //         pageY: yValue.current
          //       }
          //     }
          //   ],
          //   { useNativeDriver: false }
          // )
          xValue.current.setValue(evt.nativeEvent.pageX);
          console.log("currentValue", evt.nativeEvent.pageX);
        }}
        style={{
          ...styles.box1,
          transform: [{ translateX: diffX }]
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,

    margin: 10
  },
  instructions: {
    color: "#333333",
    marginBottom: 5
  },
  box1: {
    backgroundColor: "green",
    height: 100,
    width: 100
  },
  boxText: {
    textAlign: "center",
    fontSize: 17,
    color: "#fff",
    top: "50%",
    transform: [{ translateY: -10 }]
  }
});
