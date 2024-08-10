// src/screens/UserScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomTabNavigator from '../navigation/TabNavigation';

const UserScreen: React.FC = () => {
  return (
    <View style={styles.container}>
     
      <View style={styles.header}>
        <View style={styles.background} />
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }} // Substitua pelo URL da foto do perfil
            style={styles.profilePic}
          />
          <Text style={styles.username}>Nome do Usuário</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Icon name='user' size={20} color="#000" style={styles.icon} />
          <Text style={styles.buttonText}>Detalhes do Perfil</Text>
          <Icon name='arrow-right' size={20} color="#000" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name='bank' size={20} color="#000" style={styles.icon} />
          <Text style={styles.buttonText}>Detalhes da Conta</Text>
          <Icon name='arrow-right' size={20} color="#000" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name='book' size={20} color="#000" style={styles.icon} />
          <Text style={styles.buttonText}>Histórico</Text>
          <Icon name='arrow-right' size={20} color="#000" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>

      <BottomTabNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    height: 250,
    backgroundColor: '#7B22D3',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#7B22D3',
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  editButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  editButtonText: {
    fontSize: 16,
    color: '#7B22D3',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
    flex: 1,
    marginLeft: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  logoutButton: {
    backgroundColor: '#7B22D3',
    width: '50%',
    padding: 15,
    borderRadius: 5,
    margin: 40,
    marginLeft: 100,
    marginBottom: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700'
  },
});

export default UserScreen;
