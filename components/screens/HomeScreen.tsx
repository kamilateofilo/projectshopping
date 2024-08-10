import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Pressable, ActivityIndicator } from 'react-native';
import ProductCard from '../Components/Card';
import BottomTabNavigator from '../navigation/TabNavigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import WalletCard from '../Components/WalletCard';
import Carousel from '../Components/Banner';

const HomeScreen: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const navigation = useNavigation();

  const fetchProducts = async (pageNumber: number = 1) => {
    console.log(`Fetching page ${pageNumber}`);
    try {
      const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json');
      const data = await response.json();
      console.log('Fetched data:', data);

      const paginatedProducts = data.slice((pageNumber - 1) * 10, pageNumber * 10);

      if (paginatedProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts(prevProducts => {
          const allProducts = [...prevProducts, ...paginatedProducts];
          const uniqueProducts = allProducts.filter((value, index, self) =>
            index === self.findIndex((t) => t.id === value.id)
          );
          return uniqueProducts;
        });
      }

      setPage(pageNumber);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      fetchProducts(page + 1);
    }
  };

  const handleAddToCart = (id: number) => {
    console.log(`Add product ${id} to cart`);
  };

  const handleToggleFavorite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  const renderItem = ({ item }: { item: any }) => {
    const price = parseFloat(item.price) || 0;

    return (
      <ProductCard
        id={item.id}
        title={item.name}
        price={price} 
        image={item.image_link}
        description={item.description}
        onAddToCart={handleAddToCart}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={favorites.includes(item.id)}
      />
    );
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <View style={styles.user}>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.userPhoto} />
          <Text style={styles.greeting}>Olá, Kamila</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Shopping Coins</Text>
          <Pressable style={styles.notificationIcon}>
            <Icon name="bell" size={24} color="#FFF" />
          </Pressable>
        </View>
      </View> 
      
      <WalletCard />
      
    
      <Carousel />
      
      
      {loading ? (
        <ActivityIndicator size="large" color="#7B22D3" style={styles.loader} />
      ) : (
        <View style={styles.productsContainer}>
          <FlatList
            data={products} 
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.productList}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loadingMore ? <ActivityIndicator size="large" color="#7B22D3" /> : null}
          />
          {!loading && (
            <View style={styles.viewMoreContainer}>
              <Pressable
                style={styles.viewMoreButton}
                onPress={() => navigation.navigate('ProductListScreen' as never)} // Navegar para a tela de todos os produtos
              >
                <Text style={styles.viewMoreText}>Ver mais</Text>
              </Pressable>
            </View>
          )}
        </View>
      )}
      
      <BottomTabNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#7B22D3',
    flexDirection: 'row',
    alignItems: 'center',
  },
  user: {
    flexDirection: 'column',
    margin: 5,
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    marginBottom: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    backgroundColor: '#313131',
    color: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    fontSize: 16,
    fontWeight: '700',
  },
  notificationIcon: {
    marginTop: 15,
    alignItems: 'flex-end',
  },
  greeting: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '800',
    marginLeft: 5,
  },
  productsContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 20, // Ajustar o padding para garantir que o botão esteja visível
    marginBottom: 50
  },
  productList: {
    flexGrow: 1,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  viewMoreContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  viewMoreButton: {
    padding: 15,
    backgroundColor: '#7B22D3',
    borderRadius: 10,
    alignItems: 'center',
  },
  viewMoreText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
