import { Text, View, StyleSheet } from "react-native"
import Title from "../components/Title"
import { useState } from "react"
import NumberContainer from "../components/game/NumberContainer"

function generateRandomBetween(min, max, exclude) {
    const randNum = Math.floor(Math.random() * (max - min)) + min

    if (randNum === exclude) {
        generateRandomBetween(min, max, exclude)
    } else {
        return randNum
    }
}

function GameScreen({ userNumber }) {
    const initialGuess = generateRandomBetween(1, 100, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)

    return (
        <View style={styles.screen}>
            <Title>Opponents Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View>
                <Text>Higher or lower</Text>
            </View>
        </View>
    )
}

export default GameScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24
    }
})