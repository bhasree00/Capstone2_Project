import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';

import MainScreen from './MainScreen/MainScreen';
import SearchScreen from './SearchScreen/SearchScreen';
import NavigationScreen from './NavigationScreen/NavigationScreen';
import EStyleSheet from 'react-native-extended-stylesheet';
import PlanTripScreen from './PlanTripScreen/PlanTripScreen';

LogBox.ignoreLogs(['Possible...']); // Ignore log notification by message

const Stack = createNativeStackNavigator();
EStyleSheet.build();

export default function App() {
  return (
    <NavigationContainer>
      {/* <script async
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCT27zST6QhzHxiNFjSmC_vcfwjfIJdnjc&libraries=places&callback=initMap">
      </script> */}
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Navigation" component={NavigationScreen} />
        <Stack.Screen name="PlanTrip" component={PlanTripScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}