/**
 * Kavia RaffleConnect Mobile App
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  ParticipantFormScreen, 
  PrizeShowcaseScreen, 
  SubmissionScreen, 
  SuccessScreen 
} from './src/screens';
import { colors } from './src/styles';

// Create the stack navigator
const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.kaviaDark}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ParticipantForm"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: colors.kaviaDark },
          }}
        >
          <Stack.Screen 
            name="ParticipantForm" 
            component={ParticipantFormScreen} 
          />
          <Stack.Screen 
            name="PrizeShowcase" 
            component={PrizeShowcaseScreen} 
          />
          <Stack.Screen 
            name="Submission" 
            component={SubmissionScreen} 
          />
          <Stack.Screen 
            name="Success" 
            component={SuccessScreen} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.kaviaDark,
  },
});

export default App;
