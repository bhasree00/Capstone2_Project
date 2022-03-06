import { StyleSheet } from 'react-native';

const styles =  StyleSheet.create({
  sectionWrapper: {
    flex: 1,
    minHeight: 'fit-content',
    marginTop: '1rem',
    marginBottom: '1rem'
  },
  sectionHeader: {
    marginBottom: '1rem'
  },
  backgroundImage: {
    width: '100%',
    flex: 2,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  headerTextWrapper: {
    marginRight: '5vw',
    marginLeft: '5vw',
    paddingBottom: '1.5rem'
  },
  headerTitle: {
    fontSize: '2rem',
    color: 'white',
  },
  headerSubTitle: {
    fontSize: '0.75rem',
    color: 'white',
  },
  searchBarWrapper: {
    flex: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1.5rem'
  },
  searchBar: {
    width: '90vw',
    backgroundColor: 'white',
    height: '2.5rem',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 10,
    padding: '1rem',
    shadowOffset: {
      width: 0,
      height: '0.25rem'
    },
    shadowRadius: '0.35rem',
    shadowOpacity: 0.15
  },
  searchBarText: {
    fontSize: '1rem'
  }
});

export default styles;