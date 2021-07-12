import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import CategoryCard from '../components/CategoryCard';
import TrendingCard from '../components/TrendingCard';
import { COLORS, dummyData, FONTS, icons, images, SIZES } from '../constants';

const Home = ({ navigation }) => {
  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: SIZES.padding,
          alignItems: 'center',
          height: 80,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ color: COLORS.darkGreen, ...FONTS.h2 }}>
            Hello Hosein
          </Text>
          <Text style={{ marginTop: 3, color: COLORS.gray, ...FONTS.body4 }}>
            What you want to cook today?
          </Text>
        </View>
        <TouchableOpacity onPress={() => console.log('profiel')}>
          <Image
            source={images.profile}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderSearchBar() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          alignItems: 'center',
          marginHorizontal: SIZES.padding,
          paddingHorizontal: SIZES.padding,
          borderRadius: 10,
          backgroundColor: COLORS.lightGray,
        }}
      >
        <Image
          source={icons.search}
          style={{ width: 20, height: 20, tintColor: COLORS.gray }}
        />
        <TextInput
          style={{ marginLeft: SIZES.radius, ...FONTS.body3, width: '100%' }}
          placeholderTextColor={COLORS.gray}
          placeholder="Search Recipes"
        />
      </View>
    );
  }

  function renderSeeRecipeCard() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 100,
          alignItems: 'center',
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          paddingHorizontal: SIZES.padding,
          borderRadius: 10,
          backgroundColor: COLORS.lightGreen,
        }}
      >
        <View
          style={{ width: 100, alignItems: 'center', justifyContent: 'center' }}
        >
          <Image source={images.recipe} style={{ width: 80, height: 80 }} />
        </View>

        <View style={{ flex: 1, paddingVertical: SIZES.radius }}>
          <Text>You have 12 recipes taht you haven't tried yet</Text>
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={() => console.log('See Recipes')}
          >
            <Text
              style={{
                color: COLORS.darkGreen,
                textDecorationLine: 'underline',
                ...FONTS.h4,
              }}
            >
              See Recipes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderTrendingSection() {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        <Text style={{ marginHorizontal: SIZES.padding, ...FONTS.h2 }}>
          Trending Recipe
        </Text>

        <FlatList
          data={dummyData.trendingRecipes}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <TrendingCard
                containerStyle={{ marginLeft: index == 0 ? SIZES.padding : 0 }}
                item={item}
                onPress={() => navigation.navigate('Recipe', { recipe: item })}
              />
            );
          }}
        />
      </View>
    );
  }

  function renderCategoryHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          marginHorizontal: SIZES.padding,
        }}
      >
        <Text style={{ flex: 1, ...FONTS.h2 }}>Categories</Text>

        <TouchableOpacity>
          <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>View All</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <FlatList
        data={dummyData.categories}
        keyExtractor={(item) => `${item.id}`}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator
        ListHeaderComponent={
          <View>
            {/* Header */}
            {renderHeader()}

            {/* Search Bar */}
            {renderSearchBar()}

            {/* See Recipe Card */}
            {renderSeeRecipeCard()}

            {/* Trending Section */}
            {renderTrendingSection()}

            {/* Category Header */}
            {renderCategoryHeader()}
          </View>
        }
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            onPress={() => navigation.navigate('Recipe', { recipe: item })}
            containerStyle={{ marginHorizontal: SIZES.padding }}
          />
        )}
        ListFooterComponent={<View style={{ marginBottom: 100 }} />}
      />
    </SafeAreaView>
  );
};

export default Home;
