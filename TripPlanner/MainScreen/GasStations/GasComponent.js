import * as React from 'react';
import { View, StyleSheet } from 'react-native';

const GasComponent = ({navigation}) => {
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

export default GasComponent;