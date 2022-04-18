import * as React from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
// import CalendarPicker from 'react-native-calendar-picker';

const PlanTripScreen = ({navigation}) => {
  const [date, setDate] = React.useState(new Date());

  const dateChange = (date) => {
    console.log(date);
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Plan Trip</Text>
      <DatePicker date={date} onDateChange={dateChange} />
      {/* <CalendarPicker
        onDateChange={dateChange}
      /> */}
    </View>
  );
}

export default PlanTripScreen;