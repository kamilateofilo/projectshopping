import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { useNavigation, NavigationProp, ParamListBase, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BottomTabNavigator: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute();

  const getIconColor = (screenName: string) => {
    return route.name === screenName ? '#7B22D3' : '#ccc'; 
  };

  return (
    <View style={styles.tabBar}>
      <Pressable
        style={styles.tab}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Icon name="home" size={30} color={getIconColor("HomeScreen")} />
      </Pressable>
      <Pressable
        style={styles.tab}
        onPress={() => navigation.navigate("ProductListScreen")}
      >
        <Icon name="shopping-bag" size={30} color={getIconColor("BagScreen")} />
      </Pressable>

      <Pressable
        style={styles.tab}
        onPress={() => navigation.navigate("Cart")}
      >
        <Icon name="shopping-cart" size={30} color={getIconColor("Cart")} />
      </Pressable>

      <Pressable
        style={styles.tab}
        onPress={() => navigation.navigate("UserScreen")}
      >
        <Icon name="user" size={30} color={getIconColor("UserScreen")} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 70,
    elevation: 10,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1.5,
    shadowRadius: 4,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomTabNavigator;
