import * as React from 'react';
import { Button, View, StyleSheet } from 'react-native';

const TripComponent = ({navigation}) => {
  return (
    <View style={styles.box}/>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 125,
    height: 100,
    backgroundColor: "red"
  }
});

export default TripComponent;