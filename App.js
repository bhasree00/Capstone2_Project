import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from './MainScreen/MainScreen';
import SearchScreen from './SearchScreen/SearchScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  // const API_KEY = 'AIzaSyCT27zST6QhzHxiNFjSmC_vcfwjfIJdnjc'

  // function initMap() {
  //   var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
  
  //   map = new google.maps.Map(document.getElementById('map'), {
  //       center: pyrmont,
  //       zoom: 15
  //     });
  
  //   var request = {
  //     location: pyrmont,
  //     radius: '500',
  //     type: ['restaurant']
  //   };
  
  //   service = new google.maps.places.PlacesService(map);
  //   service.nearbySearch(request, callback);
  // }
  
  // function callback(results, status) {
  //   if (status == google.maps.places.PlacesServiceStatus.OK) {
  //     console.log('callback');
  //     console.log(results);
  //   }
  //   else {
  //     console.log('Fail');
  //   }
  // }

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
