import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchWeather = async () => {
    const apiKey = '8896e67675fd1806a70c75a8dc553616';
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
    <ImageBackground
      source={require('./assets/weather_background.png')} 
      style={styles.container}
    >
      <Text style={styles.title}>Clima Atual</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da sua cidade"
        value={city}
        onChangeText={(text) => setCity(text)}
        placeholderTextColor="#ccc"
      />
      <TouchableOpacity style={styles.button} onPress={fetchWeather}>
        <Text style={styles.buttonText}>Buscar Clima</Text>
      </TouchableOpacity>

      {errorMessage ? (
        <Text style={styles.error}>{errorMessage}</Text>
      ) : (
        weather && (
          <View style={styles.weatherContainer}>
            <Text style={styles.city}>{weather.name}</Text>
            <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
            <Text style={styles.description}>{weather.weather[0].description}</Text>
          </View>
        )
      )}

      <StatusBar style="light" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Alinha o conteúdo no topo
    alignItems: 'center',
    paddingTop: 60, // Define uma distância do topo
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 32,
    fontWeight: '300',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    color: '#fff',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  weatherContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  city: {
    fontSize: 36,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 64,
    fontWeight: '300',
    color: '#fff',
  },
  description: {
    fontSize: 24,
    fontStyle: 'italic',
    color: '#fff',
    textTransform: 'capitalize',
    marginTop: 10,
  },
  error: {
    fontSize: 18,
    color: 'red',
    marginTop: 20,
  },
});
