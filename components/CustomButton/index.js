import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS } from '../../constants';

const CustomButton = ({ title, containerStyle, colors = [], onPress }) => {
  if (colors.length > 0) {
    return (
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={colors}
          style={{ ...containerStyle }}
        >
          <Text
            style={{ textAlign: 'center', color: COLORS.white, ...FONTS.h3 }}
          >
            {title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={onPress} style={{ ...containerStyle }}>
        <Text style={{ textAlign: 'center', color: COLORS.white, ...FONTS.h3 }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
};

export default CustomButton;
