import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

export default function App() {
  const [Artista, setArtista] = useState('');
  const [Cancion, setCancion] = useState('');
  const [Letra, setLetra] = useState('');

  const buscarCanApi = () => {
    const burl = 'https://api.lyrics.ovh/v1';

    fetch(`${burl}/${Artista}/${Cancion}`)
      .then((response) => response.json())
      .then((data) => setLetra(data.lyrics))
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder='Nombre del Artista' value={Artista} onChangeText={setArtista} />
        <TextInput style={styles.input} placeholder='Nombre de la Canción' value={Cancion} onChangeText={setCancion} />
        <Button onPress={buscarCanApi} title='Buscar Letra' color='#6a1b9a' />
        <FlatList
          data={[{ title: 'letra', key: 'item' }]}
          renderItem={({ item }) => (
            <TouchableHighlight key={item.key}>
              <View style={styles.LetraContainer}>
                <Text style={styles.LetraText}>{Letra}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#D5A6F0',
  },
  container: {
    flex: 1,
    backgroundColor: '#D5A6F0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: '#A3C4BC',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
    width: '80%',
    backgroundColor: '#FFFFFF',
    color: '#333333',
  },
  LetraContainer: {
    marginTop: 20,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '90%',
  },
  LetraText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
  },
});
