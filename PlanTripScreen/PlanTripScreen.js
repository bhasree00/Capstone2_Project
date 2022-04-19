import * as React from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
// import CalendarPicker from 'react-native-calendar-picker';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  container: {
    flex: 1,
    width: '100%',
  },
  map: {
    flex: 1
  },
  popMenu: {
    position: 'absolute'
  },
  temp: {
    padding: 10
  },
  button: {
    padding: '5%',
    borderRadius: 15
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  }
});

const PlanTripScreen = ({navigation}) => {
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Plan Trip</Text>
      <Pressable
        onPress={() => navigation.goBack()}
      >
        <Text>Go Back</Text>
      </Pressable>
      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'red': 'blue'
          },
          styles.button
        ]}
        onPress={() => setOpen(true)}>
        <Text style={styles.buttonText}>When are you leaving?</Text>
      </Pressable>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Text>{date.toDateString()} at {date.getHours()}:{date.getMinutes()}</Text>
      {/* <CalendarPicker
        onDateChange={dateChange}
      /> */}
    </View>
  );
}

export default PlanTripScreen;