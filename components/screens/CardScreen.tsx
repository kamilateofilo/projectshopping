import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useCart } from '../../components/Components/hooks/useCart'; // Supondo que você tenha um hook personalizado para o carrinho
import { useNavigation } from '@react-navigation/native';
import BottomTabNavigator from '../navigation/TabNavigation';


const CartScreen: React.FC = () => {
  const { cartItems } = useCart(); // Use o hook para obter os itens do carrinho
  
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen' as never)}>
        <Icon name='arrow-left' size={24} color='#7B22D3' />
      </TouchableOpacity>
      <Text style={styles.title}>Carrinho de Compras</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>Seu carrinho está vazio.</Text>}
      />
      <BottomTabNavigator/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    marginTop: 20,
    //padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 5,
  },
  itemTitle: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    color: '#7B22D3',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7B22D3',
  },
});

export default CartScreen;
