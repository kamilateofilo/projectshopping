import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Modal, Button } from 'react-native';
import ProductCard from '../Components/Card'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import BottomTabNavigator from '../navigation/TabNavigation';


interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image_link: string;
  category: string;
}


const categoryTranslations: Record<string, string> = {
  "lipstick": "Batom",
  "foundation": "Base",
  "mascara": "Máscara",
  "blush": "Blush",
  "eyeshadow": "Sombra",
  "nailpolish": "Esmalte",
  "eyeliner": "Delineador",
  "concealer": "Corretivo",
};

const ProductListScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas as Categorias');
  const [categories, setCategories] = useState<string[]>(['Todas as Categorias']); 
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  const navigation = useNavigation();

  const fetchProducts = async (pageNumber: number = 1, category: string = '') => {
    try {
      console.log(`Fetching page ${pageNumber} with category ${category}`);
      const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json');
      const data: Product[] = await response.json();
      console.log('Fetched data:', data);

      
      const filteredData = category ? data.filter((product) => product.category === category) : data;

      const paginatedProducts = filteredData.slice((pageNumber - 1) * 10, pageNumber * 10);

      if (paginatedProducts.length === 0) {
        setHasMore(false);
      }

      setProducts(prevProducts => {
        const allProducts = [...prevProducts, ...paginatedProducts];
        const uniqueProducts = allProducts.filter((value, index, self) =>
          index === self.findIndex((t) => t.id === value.id)
        );
        return uniqueProducts;
      });

      setPage(pageNumber);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json');
        const data: Product[] = await response.json();
        console.log('Fetched categories data:', data);

        const categoriesList = Array.from(new Set(data.map((product) => product.category)));
        console.log('Categories list:', categoriesList);

        const translatedCategories = categoriesList.map(category => 
          categoryTranslations[category] || category
        );
        translatedCategories.unshift("Todas as Categorias");
        setCategories(translatedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      fetchProducts(page + 1, selectedCategory === 'Todas as Categorias' ? '' : selectedCategory);
    }
  };

  const handleAddToCart = async (id: number) => {
    console.log(`Add product ${id} to cart`);
    setModalMessage(`Produto ${id} adicionado ao carrinho!`);
    setShowModal(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    setShowModal(false);
    
  };

  const handleToggleFavorite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  const renderItem = ({ item }: { item: Product }) => {
    if (!item) return null;

    const price = parseFloat(item.price) || 0;

    return (
      <ProductCard
        id={item.id}
        title={item.name}
        description={item.description}
        price={price} 
        image={item.image_link}
        onAddToCart={handleAddToCart}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={favorites.includes(item.id)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen' as never)}>
          <Icon name='arrow-left' size={20} color='#7B22D3' style={{backgroundColor: "#fff", width: 23, height: 23, borderRadius: 5}}/>
        </TouchableOpacity>
        <Text style={styles.title}>Voltar</Text>
        <View style={styles.filterContainer}>
          <Picker
            selectedValue={selectedCategory}
            style={styles.picker}
            onValueChange={(itemValue: string) => {
              setSelectedCategory(itemValue);
              setProducts([]); 
              setPage(1); 
              fetchProducts(1, itemValue === 'Todas as Categorias' ? '' : itemValue);
            }}
          >
            {categories.map((category) => (
              <Picker.Item key={category} label={category} value={category} />
            ))}
          </Picker>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#7B22D3" />
      ) : (
        <View style={styles.modalContainer}>
          <Text style={styles.titleShop}>Shop</Text>
          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2} 
            columnWrapperStyle={styles.row} 
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={loadingMore ? <ActivityIndicator size="large" color="#7B22D3" /> : null}
          />
        </View>
      )}
      <BottomTabNavigator/>
      <Modal
        transparent={true}
        visible={showModal}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <Button title="Fechar" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    height: 100,
    backgroundColor: '#7B22D3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '200',
    marginLeft: 10,
    flex: 1,
    color: '#fff'
  },
  titleShop: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 25,
    fontWeight: '800'
  },
  filterContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: 150,
  },
  row: {
    justifyContent: 'space-around', 
    marginBottom: 10,
    marginTop: 30
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
    marginTop: -10, 
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default ProductListScreen;