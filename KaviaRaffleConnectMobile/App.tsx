/**
 * Kavia RaffleConnect Mobile App
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { ParticipantFormScreen } from './src/screens';
import { colors } from './src/styles';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.kaviaDark}
      />
      <View style={styles.content}>
        <ParticipantFormScreen />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.kaviaDark,
  },
  content: {
    flex: 1,
  },
});

export default App;
