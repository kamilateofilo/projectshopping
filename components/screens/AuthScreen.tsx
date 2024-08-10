import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import LoginModal from './LoginModal';

const AuthScreen: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setModalVisible(true);
      Animated.timing(slideAnim, {
        toValue: -210,
        useNativeDriver: true,
      }).start();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [slideAnim]);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/capa.png")} style={styles.backgroundImage} />
      <View style={styles.overlay} />
      <Animated.View style={[styles.content, { transform: [{ translateY: slideAnim }] }]}>
        <Image source={require("../../assets/images/wallet.png")} style={styles.icon} />
        <Text style={styles.title}>Shopping Coins</Text>
      </Animated.View>
      <LoginModal isVisible={isModalVisible} onClose={handleCloseModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#7B22D3',
    opacity: 0.5,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    backgroundColor: '#313131',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AuthScreen;
