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
import { COLORS, dummyData, SIZES } from '../constants';

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <FlatList
        data={dummyData.categories}
        keyExtractor={(item) => `${item.id}`}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator
        ListHeaderComponent={<View></View>}
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
