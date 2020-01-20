import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type Props = {
  icon: string;
  color: string;
};

export const Card: React.FC<Props> = ({ icon, color }) => {
  const animated = new Animated.Value(0);
  const [prevColor, setPrevColor] = useState('#FFFFFF');

  useEffect(() => {
    return () => {
      setPrevColor(color);
      animated.setValue(0);
    };
  }, [color]);

  useEffect(() => {
    Animated.spring(animated, {
      toValue: 1
    }).start();
  }, [icon, prevColor]);

  const height = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 110]
  });

  const bgColor = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [prevColor, color]
  });

  return (
    <Animated.View
      style={{
        marginHorizontal: 10,
        marginBottom: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: bgColor,
        height,
      }}
    >
      <FontAwesome
        name={icon}
        size={25}
        color="black"
      />
    </Animated.View>
  );
};
