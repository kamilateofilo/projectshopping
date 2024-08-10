import React, { useEffect }  from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/screens/HomeScreen';
import BagScreen from '../components/screens/BagScreen';
import UserScreen from '../components/screens/UserScreen';
import AuthScreen from '../components/screens/AuthScreen';
import BottomTabNavigator from '../components/navigation/TabNavigation';
import ProductCard from '@/components/Components/Card';
import AllScreen from '@/components/Components/ProductDetailScreen'
import ProductDetailScreen from '@/components/Components/ProductDetailScreen';
import ProductListScreen from '@/components/screens/ProductListScreen';
import CartScreen from '@/components/screens/CardScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  useEffect(() => {
    //configureNotifications();
  }, []);

  return (
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BagScreen"
          component={BagScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserScreen"
          component={UserScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen 
         name="ProductDetailScreen" 
         component={ProductDetailScreen} 
         options={{ headerShown: false }} 
         />
         <Stack.Screen 
         name="ProductListScreen" 
         component={ProductListScreen} 
         options={{ headerShown: false }} 
         />
         <Stack.Screen 
         name="Cart" 
         component={CartScreen} 
         options={{ headerShown: false }} 
         />
      </Stack.Navigator>
  );
};

export default App;
