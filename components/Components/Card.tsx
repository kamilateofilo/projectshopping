import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../app/types'; // Ajuste o caminho conforme necessário

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  onAddToCart: (id: number) => void;
  onToggleFavorite: (id: number) => void;
  isFavorite: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  price,
  image,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
}) => {
  const handleAddToCart = () => {
    onAddToCart(id); // Adiciona ao carrinho
    // Não navega para a página do carrinho
  };

  const truncatedTitle = title.split(' ').slice(0, 3).join(' ');
  const formattedPrice = typeof price === 'number' ? price.toFixed(2) : '0.00';

  return (
    <Pressable>
      <View style={styles.card}>
        <Image source={{ uri: image || 'https://via.placeholder.com/150' }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{truncatedTitle}</Text>
          <Text style={styles.price}>${formattedPrice}</Text>
          <View style={styles.actions}>
            <Pressable onPress={() => onToggleFavorite(id)}>
              <Icon name={isFavorite ? 'heart' : 'heart-o'} size={24} color="#7B22D3" />
            </Pressable>
            <Pressable onPress={handleAddToCart} style={styles.cartButton}>
              <Icon name="shopping-cart" size={24} color="#fff" />
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 2,
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: 150,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#7B22D3',
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cartButton: {
    backgroundColor: '#7B22D3',
    borderRadius: 20,
    padding: 5,
  },
});

export default ProductCard;
