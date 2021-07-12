import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Platform,
  StyleSheet,
} from 'react-native';
import { SIZES, COLORS, FONTS, icons } from '../../constants';
import { BlurView } from '@react-native-community/blur';

const RecipeCardDetails = ({ recipeItem }) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <Text
          style={{
            width: '70%',
            color: COLORS.white,
            ...FONTS.h3,
            fontSize: 18,
          }}
        >
          {recipeItem.name}
        </Text>

        <Image
          source={recipeItem.isBookmark ? icons.bookmarkFilled : icons.bookmark}
          style={{
            width: 20,
            height: 20,
            marginRight: SIZES.base,
            tintColor: COLORS.darkGreen,
          }}
        />
      </View>

      <Text style={{ color: COLORS.lightGray, ...FONTS.body4 }}>
        {recipeItem.duration} | {recipeItem.serving} Serving
      </Text>
    </View>
  );
};

const RecipeCardInfo = ({ recipeItem }) => {
  if (Platform.OS === 'ios') {
    return (
      <BlurView blurType="dark" style={styles.recipeCardContainer}>
        <RecipeCardDetails recipeItem={recipeItem} />
      </BlurView>
    );
  } else {
    return (
      <View
        style={{
          ...styles.recipeCardContainer,
          backgroundColor: COLORS.transparentDarkGray,
        }}
      >
        <RecipeCardDetails recipeItem={recipeItem} s />
      </View>
    );
  }
};

const TrendingCard = ({ containerStyle, item, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 350,
        width: 250,
        marginTop: SIZES.radius,
        borderRadius: SIZES.radius,
        marginRight: 20,
        ...containerStyle,
      }}
    >
      <Image
        source={item.image}
        resizeMode="cover"
        style={{ width: 250, height: 350, borderRadius: SIZES.radius }}
      />

      <View
        style={{
          position: 'absolute',
          top: 20,
          left: 15,
          paddingHorizontal: SIZES.radius,
          paddingVertical: 5,
          backgroundColor: COLORS.transparentGray,
          borderRadius: SIZES.radius,
        }}
      >
        <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
          {item.category}
        </Text>
      </View>
      <RecipeCardInfo recipeItem={item} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recipeCardContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    height: 100,
    paddingVertical: SIZES.radius,
    paddingHorizontal: SIZES.base,
    borderRadius: SIZES.radius,
  },
});

export default TrendingCard;
