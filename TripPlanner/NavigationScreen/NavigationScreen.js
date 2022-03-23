import * as React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import MapboxNavigation from '@homee/react-native-mapbox-navigation';

const NavigationScreen = ({navigation}) => {
  const handleEndNavigation = () => {
    console.log('End pressed');
    navigation.navigate('Search');
  }

  return (
    <View style={styles.container}>
      <MapboxNavigation
        origin={[-97.760288, 30.273566]}
        destination={[-97.918842, 30.494466]}
        shouldSimulateRoute // this is demoing someone driving
        hideStatusView // also just used for demo
        showsEndOfRouteFeedback
        onLocationChange={(event) => {
          const { latitude, longitude } = event.nativeEvent;
        }}
        onRouteProgressChange={(event) => {
          const {
            distanceTraveled,
            durationRemaining,
            fractionTraveled,
            distanceRemaining,
          } = event.nativeEvent;
        }}
        onError={(event) => {
          const { message } = event.nativeEvent;
        }}
        onCancelNavigation={() => {
          Alert.alert(
            "Cancel Navigation",
            "Are you sure you'd like to end the route?",
            [
              {
                text: "Resume",
                onPress: () => console.log("Resume Pressed"),
                style: "cancel"
              },
              { text: "End", onPress: () => handleEndNavigation() }
            ]
          );
        }}
        onArrive={() => {
          // Called when you arrive at the destination.
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NavigationScreen;