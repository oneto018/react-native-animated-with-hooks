import { useRef, useEffect, useState, useCallback } from "react";
import { Animated } from "react-native";
import { State } from "react-native-gesture-handler";

export function useAnimatedValue(value) {
  const v = useRef(
    value instanceof Animated.Value ? value : new Animated.Value(value)
  );
  return v.current;
}

/**
 *
 * @param {Object} param0
 */
export function useSpring({ value = 0, toValue, ...config }) {
  const animatedValue = useAnimatedValue(value);
  useEffect(() => {
    if (toValue || toValue === 0) {
      Animated.spring(animatedValue, {
        toValue,
        ...config,
        useNativeDriver: true
      }).start();
    }
  }, [toValue, value, config]);
  return animatedValue;
}

/**
 *
 * @param {{xValue: Animated.Value, yValue: Animated.Value}} param0
 */
export const useGesture = ({ xValue = 0, yValue = 0 } = {}) => {
  const [down, setDown] = useState({ state: false, endVelocity: false });

  const animX = useAnimatedValue(xValue);
  const animY = useAnimatedValue(yValue);

  const bind = useCallback(() => {
    return {
      onGestureEvent: Animated.event([
        { nativeEvent: { translationX: animX, translationY: animY } }
      ]),
      /**
       *
       * @param {import('react-native-gesture-handler').PanGestureHandlerStateChangeEvent} event
       */
      onHandlerStateChange: function(event) {
        if (event.nativeEvent.oldState === State.ACTIVE) {
          setDown({
            state: false,
            endVelocity: {
              x: event.nativeEvent.velocityX,
              y: event.nativeEvent.velocityY
            }
          });
        }
        if (event.nativeEvent.state === State.ACTIVE) {
          setDown({ state: true, endVelocity: false });
        }
      }
    };
  }, [xValue, yValue]);

  return {
    x: animX,
    y: animY,
    isDown: down.state,
    bind,
    endVelocity: down.endVelocity
  };
};
