import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';

const CategoryCard = ({ category, containerStyle, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.gray2,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Image
        source={category.image}
        resizeMode="cover"
        style={{ width: 80, height: 80, borderRadius: SIZES.radius }}
      />
      <View style={{ width: '65%', paddingHorizontal: 20 }}>
        <Text style={{ flex: 1, ...FONTS.h3 }}>{category.name}</Text>
        <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
          {category.duration} | {category.serving} Serving
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
