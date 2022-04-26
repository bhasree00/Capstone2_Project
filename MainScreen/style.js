import { StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// const styles =  StyleSheet.create({
//   sectionWrapper: {
//     flex: 1,
//     // minHeight: 'fit-content',
//     marginTop: 16,
//     marginBottom: 16
//   },
//   sectionHeader: {
//     marginBottom: 8,
//     marginLeft: 16,
//     fontWeight: '700'
//   },
//   // this is used for all restaurants, gas stations, and your trip components
//   dataRowContainer: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'row',
//     // minWidth: 'fit-content',
//     overflow: 'scroll',
//     justifyContent: 'flex-start'
//   },
//   backgroundImage: {
//     resizeMode: 'cover',
//     flex: 2,
//     justifyContent: 'flex-end',
//     marginBottom: 24
//   },
//   headerTextWrapper: {
//     marginLeft: 16,
//     paddingBottom: 24
//   },
//   headerTitle: {
//     fontSize: 28,
//     color: 'white',
//     fontWeight: '500'
//   },
//   headerSubTitle: {
//     fontSize: 12,
//     color: 'white',
//     flexDirection:'row',
//     justifyContent: 'flex-start',
//     alignItems: 'center'
//   },
//   searchBarWrapper: {
//     marginBottom: 16,
//     position: 'absolute',
//     top: 245,
//     right: 16
//   },
//   searchBar: {
//     width: 360,
//     height: 32,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     borderRadius: 10,
//     shadowOffset: {
//       width: 0,
//       height: 4
//     },
//     shadowRadius: 4,
//     shadowOpacity: 0.15,
//     flexDirection: 'row'
//   },
//   searchBarText: {
//     fontSize: 16,
//     color: 'gray'
//   },
//   searchIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 8,
//     marginLeft: 8
//   },
//   dataRowOffset: {
//     width: 16,
//     padding: 0,
//     margin: 0
//   }
// });

const styles =  EStyleSheet.create({
  sectionWrapper: {
    flex: 1,
    // minHeight: 'fit-content',
    marginTop: 16,
    marginBottom: 16
  },
  sectionHeader: {
    marginBottom: 8,
    marginLeft: 16,
    fontWeight: '700'
  },
  // this is used for all restaurants, gas stations, and your trip components
  dataRowContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    // minWidth: 'fit-content',
    overflow: 'scroll',
    justifyContent: 'flex-start'
  },
  backgroundImage: {
    resizeMode: 'cover',
    flex: 2,
    justifyContent: 'flex-end',
    marginBottom: 24
  },
  headerTextWrapper: {
    marginLeft: 16,
    paddingBottom: 24
  },
  headerTitle: {
    fontSize: 28,
    color: 'white',
    fontWeight: '500'
  },
  headerSubTitle: {
    fontSize: 12,
    color: 'white',
    flexDirection:'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  searchBarWrapper: {
    marginBottom: 16,
    position: 'absolute',
    top: 245,
    right: 16
  },
  searchBar: {
    width: 360,
    height: 32,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 0.15,
    flexDirection: 'row'
  },
  searchBarText: {
    fontSize: 16,
    color: 'gray'
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
    marginLeft: 8
  },
  dataRowOffset: {
    width: 16,
    padding: 0,
    margin: 0
  }
});

export default styles;