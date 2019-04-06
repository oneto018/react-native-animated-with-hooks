//@ts-check
import React, { useRef } from "react";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  Button
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const App = ({}) => {
  const xVal = useRef(new Animated.Value(0));
  const yVal = useRef(new Animated.Value(0));

  return (
    <View style={styles.container}>
      <Button title="start" onPress={() => {}} />

      <PanGestureHandler
        onGestureEvent={Animated.event(
          [
            {
              nativeEvent: {
                translationX: xVal.current,
                translationY: yVal.current
              }
            }
          ],
          { useNativeDriver: true }
        )}
        onHandlerStateChange={evt => {
          if (evt.nativeEvent.oldState === State.ACTIVE) {
            Animated.spring(xVal.current, {
              toValue: 0,
              useNativeDriver: true
            }).start();
            Animated.spring(yVal.current, {
              toValue: 0,
              useNativeDriver: true
            }).start();
          }
        }}
      >
        <Animated.View
          style={{
            ...styles.box1,
            transform: [
              { translateX: xVal.current },
              { translateY: yVal.current }
            ]
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
    backgroundColor: "blue"
  }
});

export default App;
