import { StyleSheet, Text, View } from 'react-native';
import BadgerBakery from './components/BadgerBakery';

export default function App() {
  return (
    <View style={styles.container}>
      <BadgerBakery/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
