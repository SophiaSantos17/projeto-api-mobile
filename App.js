import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, StyleSheet, ScrollView} from 'react-native';
import axios from 'axios';

export default function App() {
  // State para armazenar a raça digitada
  const [breed, setBreed] = useState('');

  // State para armazenar os dados da raça
  const [breedData, setBreedData] = useState([]);

  // Função para buscar informações da raça
  const handleFetchBreedInfo = async () => {
    try {
      // Faz a requisição para a API
      const response = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${breed}`);
      const data = response.data;
      
      // Atualiza o state com os dados da raça
      setBreedData(data);
    } catch (error) {
      // Em caso de erro, imprime o erro no console e seta os dados como vazios
      console.error('Error fetching breed information:', error);
      setBreedData([]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.textHeader}>RAÇA DE CACHORROS</Text>
      </View>

      {/* Campo de entrada para a raça */}
      <TextInput
        style={styles.inputRequisicao}
        placeholder="Digite a raça(Inglês)"
        onChangeText={text => setBreed(text)}
        value={breed}
      />

      {/* Botão para buscar a raça */}
      <Button title="Buscar Raça" onPress={handleFetchBreedInfo} style={styles.button} />

      {/* Mostra informações dos cachorros */}
      {breedData.length > 0 ? ( // Checa se há dados para mostrar
        breedData.map(breedInfo => (
          <View key={breedInfo.id} style={styles.dogInfo}>
            <Text style={styles.title}>Raça: </Text>
            <Text style={styles.nameRaca}>{breedInfo.name}</Text>
            <Text >Altura: {breedInfo.height.metric} cm</Text>
            <Text>Peso: {breedInfo.weight.metric} kg</Text>
            <Image
              style={styles.imgRaca}
              source={{ uri: `https://cdn2.thedogapi.com/images/${breedInfo.reference_image_id}.jpg` }}
            />
          </View>
        ))
      ) : (
        <Text>Não há informações sobre essa raça.</Text>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 0,
    alignItems: 'center',
    margin: 0,
  },
  header:{
    backgroundColor: '#89B4F5',
    width: '100%',
    padding: 40,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  textHeader :{
    fontSize: 30,
  },
  inputRequisicao: {
    width: "80%",
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 15,
    margin: 12,
  },
  title: {
    marginTop: 10,
    fontSize: 20,
  },
  nameRaca: {
    fontSize: 24,
    color: '#89B4F5',
    fontWeight: 'bold',
  },
  imgRaca: {
    width: '90%',
    height: 220,
    marginTop: 10,
  },
  dogInfo: {
    marginVertical: 20,
    alignItems: 'center',
    borderWidth: 1,
    width: '80%',
    borderColor: 'black',
    padding: 10,
  },
  button:{
    color: '#89B4F5',
    padding: 20,
  }
});
