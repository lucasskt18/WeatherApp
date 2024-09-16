import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Função para buscar os dados da API
  const fetchWeather = async () => {
    const apiKey = '8896e67675fd1806a70c75a8dc553616'; // Insira sua chave da API do OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
        setErrorMessage('');
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage('Erro ao buscar dados climáticos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da cidade"
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      <Button title="Buscar Clima" onPress={fetchWeather} />

      {errorMessage ? (
        <Text style={styles.error}>{errorMessage}</Text>
      ) : (
        weather && (
          <View style={styles.weatherContainer}>
            <Text style={styles.city}>{weather.name}</Text>
            <Text style={styles.temperature}>{weather.main.temp}°C</Text>
            <Text style={styles.description}>{weather.weather[0].description}</Text>
          </View>
        )
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    width: '100%',
    marginBottom: 20,
    borderRadius: 5,
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  city: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  error: {
    marginTop: 20,
    color: 'red',
    fontSize: 16,
  },
});
