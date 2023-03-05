import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';
import { useFonts } from 'expo-font'
import Apploading from 'expo-app-loading'

export default function App() {
  const [enteredNumber, setEnteredNumber] = useState(null)
  const [isGameOver, setIsGameOver] = useState(true)
  const [guessRounds, setGuessRounds] = useState(0)

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })

  if (!fontsLoaded) {
    return <Apploading />
  }

  function selectedNumber(number) {
    setEnteredNumber(number)
    setIsGameOver(false)
  }

  function startGameScreen() {
    setIsGameOver(true)
  }

  function startNewGameHandler() {
    setEnteredNumber(null)
    setGuessRounds(0)
  }

  let screen = <StartGameScreen onSelectingNumber={selectedNumber} />
  if (enteredNumber) {
    screen = <GameScreen userNumber={enteredNumber} onGameOver={startGameScreen} />

    if (isGameOver && enteredNumber) {
      screen = <GameOverScreen roundsNumber={guessRounds} userNumber={enteredNumber} onStartNewGame={startNewGameHandler} />
    }
  }

  return (
    <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
      <ImageBackground
        source={require('./assets/images/background.png')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  },
  backgroundImage: {
    opacity: 0.15
  }
});
