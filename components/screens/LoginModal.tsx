import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
// import auth from '@react-native-firebase/auth'; // Importe o Firebase Authentication (comentado)

interface LoginModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isVisible, onClose }) => {
  const navigation = useNavigation(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // await auth().signInWithEmailAndPassword(email, password);

      navigation.navigate('HomeScreen' as never);
    } catch (error) {
      // Alert.alert('Erro', 'Email ou senha incorretos');
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <Image source={require("../../assets/images/user.png")} style={styles.icon} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#000"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail} 
          />
        </View>
        <View style={styles.inputContainer}>
          <Image source={require("../../assets/images/lock.png")} style={styles.icon} />
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#000"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword} 
          />
        </View>
        <TouchableOpacity 
        style={styles.button}
        onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: 450,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    marginBottom: 10,
    elevation: 10,
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
  },
  input: {
    flex: 1,
    height: 80,
    width: 330,
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    paddingHorizontal: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 20,
  },
  button: {
    backgroundColor: '#7B22D3',
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
    width: 100,
    height: 48,
    marginLeft: '36%'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22
  },
});

export default LoginModal;
