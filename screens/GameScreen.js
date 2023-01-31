import { Text, View, StyleSheet, Alert } from "react-native"
import Title from "../components/Title"
import { useState } from "react"
import NumberContainer from "../components/game/NumberContainer"
import PrimaryButton from "../components/PrimaryButton"

function generateRandomBetween(min, max, exclude) {
    const randNum = Math.floor(Math.random() * (max - min)) + min

    if (randNum === exclude) {
        generateRandomBetween(min, max, exclude)
    } else {
        return randNum
    }
}

let minBoundary = 1
let maxBoundry = 100

function GameScreen({ userNumber }) {
    const initialGuess = generateRandomBetween(minBoundary, maxBoundry, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)

    function nextGuessHandler(direction) {
        if ((direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)) {
            Alert.alert("Don't lie!", "You know that is wrong...", [
                { text: 'Sorry!', style: 'cancel' }
            ])
            return
        }

        if (direction === 'lower') {
            maxBoundry = currentGuess
        } else {
            minBoundary = currentGuess + 1
        }
        const newRndNumber = generateRandomBetween(minBoundary, maxBoundry, currentGuess)
        setCurrentGuess(newRndNumber)
    }

    return (
        <View style={styles.screen}>
            <Title>Opponents Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View>
                <Text>Higher or lower</Text>
                <View>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>-</PrimaryButton>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>+</PrimaryButton>
                </View>
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