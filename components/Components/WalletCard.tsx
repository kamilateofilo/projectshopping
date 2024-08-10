// src/components/WalletCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WalletCard: React.FC = () => {
  return (
    <View style={styles.walletContainer}>
      <Text style={styles.walletText}>Minha Carteira</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  walletContainer: {
    position: 'absolute', // Faz com que o componente seja flutuante
    height: 60,
    width: 330,
    backgroundColor: '#fff',
    borderRadius: 30,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    top: 150,
    left: 33,
    right: 0,
    marginHorizontal: 'auto',
  },
  walletText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WalletCard;
