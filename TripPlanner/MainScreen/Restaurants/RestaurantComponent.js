import * as React from 'react';
import { Button, View, StyleSheet } from 'react-native';

const RestaurantComponent = (props) => {
  return (
    <View style={styles.box}/>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 125,
    height: 100,
    backgroundColor: "red",
    marginRight: 16
  }
});

export default RestaurantComponent;