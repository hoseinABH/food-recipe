import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { SIZES, FONTS, COLORS, icons } from '../constants';

const HEADER_HEIGHT = 350;

const RecipeCreatorCardDetail = ({ selectedRecipe }) => {
  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ width: 40, height: 40, marginLeft: 20 }}>
        <Image
          source={selectedRecipe?.author?.profilePic}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
      </View>
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <Text style={{ color: COLORS.lightGray2, ...FONTS.body4 }}>
          Recipe by:
        </Text>
        <Text style={{ color: COLORS.white2, ...FONTS.h3 }}>
          {selectedRecipe?.author?.name}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          width: 30,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 20,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: COLORS.lightGreen1,
        }}
        onPress={() => console.log('View Profile')}
      >
        <Image
          source={icons.rightArrow}
          style={{ width: 15, height: 15, tintColor: COLORS.lightGreen1 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const RecipeCreatorCardInfo = ({ selectedRecipe }) => {
  if (Platform.OS === 'ios') {
    return (
      <BlurView style={{ flex: 1, borderRadius: SIZES.radius }} blurType="dark">
        <RecipeCreatorCardDetail selectedRecipe={selectedRecipe} />
      </BlurView>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.transparentBlack9,
        }}
      >
        <RecipeCreatorCardDetail selectedRecipe={selectedRecipe} />
      </View>
    );
  }
};

const Recipe = ({ navigation, route }) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    let { recipe } = route.params;
    setSelectedRecipe(recipe);
  }, []);

  function renderHeaderBar() {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          flexDirection: 'row',
          height: 50,
          justifyContent: 'space-between',
          paddingHorizontal: SIZES.padding,
          alignItems: 'flex-end',
          paddingBottom: 10,
        }}
      >
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.black,
            opacity: scrollY.interpolate({
              inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 70],
              outputRange: [0, 1],
            }),
          }}
        >
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'flex-end',
              backgroundColor: COLORS.black,
            }}
          >
            <Text style={{ color: COLORS.lightGray2, ...FONTS.body4 }}>
              Recipe by:
            </Text>
            <Text style={{ color: COLORS.white2, ...FONTS.body4 }}>
              {selectedRecipe?.author?.name}{' '}
            </Text>
          </Animated.View>
        </Animated.View>

        <TouchableOpacity
          style={{
            height: 25,
            width: 25,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: COLORS.lightGray,
            backgroundColor: COLORS.transparentBlack5,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: scrollY.interpolate({
              inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
              outputRange: [0, 1],
            }),
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.back}
            style={{ width: 15, height: 15, tintColor: COLORS.lightGreen }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: 25,
            width: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={
              selectedRecipe?.isBookmark ? icons.bookmarkFilled : icons.bookmark
            }
            style={{ width: 15, height: 15, tintColor: COLORS.darkGreen }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderRecipeCardHeader() {
    return (
      <View
        style={{
          alignItems: 'center',
          overflow: 'hidden',
          paddingTop: 1000,
          marginTop: -1000,
        }}
      >
        <Animated.Image
          source={selectedRecipe?.image}
          resizeMode="contain"
          style={{
            height: HEADER_HEIGHT,
            width: '200%',
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
                }),
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [2, 1, 0.75],
                }),
              },
            ],
          }}
        />

        <Animated.View
          style={{
            position: 'absolute',
            bottom: 10,
            left: 30,
            right: 30,
            height: 80,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 170, 250],
                  outputRange: [0, 0, 100],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}
        >
          <RecipeCreatorCardInfo selectedRecipe={selectedRecipe} />
        </Animated.View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <Animated.FlatList
        data={selectedRecipe?.ingredients}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View>{renderRecipeCardHeader()}</View>}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 30,
              marginVertical: 5,
            }}
          >
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.lightGray,
                width: 50,
                height: 50,
                borderRadius: 5,
              }}
            >
              <Image source={item.icon} style={{ width: 40, height: 40 }} />
            </View>

            <View
              style={{
                flex: 1,
                paddingHorizontal: 20,
                justifyContent: 'center',
              }}
            >
              <Text style={{ ...FONTS.body3 }}>{item.description}</Text>
            </View>

            <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
              <Text>{item.quantity}</Text>
            </View>
          </View>
        )}
      />

      {renderHeaderBar()}
    </View>
  );
};

export default Recipe;
