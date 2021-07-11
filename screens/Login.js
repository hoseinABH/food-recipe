import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../components/CustomButton';
import { images, COLORS, SIZES, FONTS } from '../constants';

const Login = ({ navigation }) => {
  function renderHeader() {
    return (
      <View style={{ height: SIZES.height > 700 ? '65%' : '60%' }}>
        <ImageBackground
          source={images.loginBackground}
          style={{ flex: 1, justifyContent: 'flex-end' }}
          resizeMode="cover"
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[COLORS.transparent, COLORS.black]}
            style={{
              height: 200,
              justifyContent: 'flex-end',
              paddingHorizontal: SIZES.padding,
            }}
          >
            <Text
              style={{
                width: '80%',
                color: COLORS.white,
                ...FONTS.largeTitle,
                lineHeight: 45,
              }}
            >
              Cooking a Delicious Food Easily
            </Text>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  }

  function renderDetails() {
    return (
      <View style={{ flex: 1, paddingHorizontal: SIZES.padding }}>
        {/* Description */}

        <Text
          style={{
            marginTop: SIZES.radius,
            color: COLORS.gray,
            width: '70%',
            ...FONTS.body3,
          }}
        >
          Discover more than 1200 food recipes in your hands and cooking it
          easily!
        </Text>

        {/* Buttons */}
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <CustomButton
            title="Login"
            containerStyle={{ paddingVertical: 18, borderRadius: 20 }}
            colors={[COLORS.darkGreen, COLORS.lime]}
            onPress={() => navigation.replace('Home')}
          />

          <CustomButton
            title="Sign Up"
            containerStyle={{
              marginTop: 20,
              borderRadius: 20,
              paddingVertical: 18,
              borderWidth: 1,
              borderColor: COLORS.lime,
            }}
            onPress={() => navigation.replace('Home')}
          />
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}
    >
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      {renderHeader()}

      {/* Details */}
      {renderDetails()}
    </View>
  );
};

export default Login;
