import * as React from 'react';
import { Pressable, View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import Restaurants from './Restaurants/Restaurants';
import GasStations from './GasStations/GasStations';
import YourTrips from './YourTrips/YourTrips';
import styles from './style';

const MainScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        id="header"
        source={require("./images/headerImage.jpeg")}
        style={styles.backgroundImage}
      >
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerTitle}>Let's Plan Your Next Trip</Text>
          <Text style={styles.headerSubTitle}>Location</Text>
          <Text style={styles.headerSubTitle}>Weather</Text>
        </View>
      </ImageBackground>
      <View
        id="searchWrapper"
        style={styles.searchBarWrapper}
      >
        <Pressable
          onPress={() => navigation.navigate('Search')}
          style={styles.searchBar}
        >
          <Image
            style={styles.searchIcon}
            source={require('./images/Search_Icon.svg.png')}
          />
          <Text style={styles.searchBarText}>Where do you want to go?</Text>
        </Pressable>
      </View>
      <YourTrips style={{ flex: 4 }}/>
      <Restaurants style={{ flex: 4 }}/>
      <GasStations style={{ flex: 4 }}/>
      <View id="random" style={{ flex: 0.5 }}/>
    </View>
  );
}

export default MainScreen;