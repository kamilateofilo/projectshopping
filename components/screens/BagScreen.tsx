// src/screens/BagScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomTabNavigator from '../navigation/TabNavigation';

const BagScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Bag Screen</Text>
      <BottomTabNavigator/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
});

export default BagScreen;
