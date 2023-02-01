import { Text, View, StyleSheet, Alert } from "react-native"
import Title from "../components/game/Title"
import { useState, useEffect } from "react"
import NumberContainer from "../components/game/NumberContainer"
import PrimaryButton from "../components/game/PrimaryButton"
import Card from "../components/ui/Card"
import InstructionText from "../components/ui/InstructionText"

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

function GameScreen({ userNumber, onGameOver }) {
    const initialGuess = generateRandomBetween(1, 100, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)

    useEffect(() => {
        if (currentGuess == userNumber) {
            onGameOver()
        }
    }, [currentGuess, userNumber, onGameOver])

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
            <Card>
                <InstructionText style={styles.instructionText}>Higher or lower</InstructionText>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonViewInnerContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>-</PrimaryButton>
                    </View>
                    <View style={styles.buttonViewInnerContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>+</PrimaryButton>
                    </View>
                </View>
            </Card>
        </View>
    )
}

export default GameScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    buttonViewInnerContainer: {
        flex: 1
    },
    instructionText: {
        marginBottom: 12
    }
})