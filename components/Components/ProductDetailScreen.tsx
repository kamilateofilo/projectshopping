// src/screens/ProductDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../app/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const ProductDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ProductDetail'>>();
  const { title, description, price, image } = route.params;
  
  const navigation = useNavigation();
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen' as never)}>
        <Icon name='arrow-left' size={24} color='#7B22D3' />
      </TouchableOpacity>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>${price.toFixed(2)}</Text>
      <Text style={styles.description}>{description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#7B22D3',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
});

export default ProductDetailScreen;
