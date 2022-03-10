import * as React from 'react';
import { View, Text } from 'react-native';
import TripComponent from './TripComponent';
import styles from '../style';

const YourTrips = ({navigation}) => {
  return (
    <View style={styles.sectionWrapper}>
      <Text style={styles.sectionHeader}>Your Trips</Text>
      <TripComponent/>
    </View>
  );
}

export default YourTrips;