import { Text, View, StyleSheet, Alert, FlatList, useWindowDimensions } from "react-native"
import Title from "../components/game/Title"
import { useState, useEffect } from "react"
import NumberContainer from "../components/game/NumberContainer"
import PrimaryButton from "../components/game/PrimaryButton"
import Card from "../components/ui/Card"
import InstructionText from "../components/ui/InstructionText"
import { Ionicons } from '@expo/vector-icons'
import GuessLogItem from "../components/game/GuessLogItem"

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
    const [guessRounds, setGuessRounds] = useState([initialGuess])
    const { width } = useWindowDimensions()

    useEffect(() => {
        if (currentGuess == userNumber) {
            onGameOver(guessRounds.length)
        }
    }, [currentGuess, userNumber, onGameOver])

    useEffect(() => {
        minBoundary = 1
        maxBoundry = 100
    }, [])

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
        setGuessRounds(prevGuesses => [newRndNumber, ...prevGuesses])
    }

    let content = (
        <>
            <Card>
                <NumberContainer>{currentGuess}</NumberContainer>
                <InstructionText style={styles.instructionText}>Higher or lower</InstructionText>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonViewInnerContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name='md-remove' size={24} color='white' />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonViewInnerContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name='md-add' size={24} color='white' />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
        </>
    )

    if (width > 500) {
        content = (
            <>
                <View style={styles.buttonContainerWide}>
                    <View style={styles.buttonViewInnerContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name='md-remove' size={24} color='white' />
                        </PrimaryButton>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style={styles.buttonViewInnerContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name='md-add' size={24} color='white' />
                        </PrimaryButton>
                    </View>
                </View>


            </>
        )
    }

    return (
        <View style={styles.screen}>
            <Title>Opponents Guess</Title>
            {content}
            <View style={styles.listContainer}>
                <FlatList
                    data={guessRounds}
                    renderItem={(itemData) => <GuessLogItem
                        roundNumber={guessRounds.length - itemData.index}
                        guess={itemData.item} />}
                    keyExtractor={(item) => item}
                />
            </View>
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
    buttonContainerWide: {
        flexDirection: "row",
        alignContent: "center"
    },
    buttonViewInnerContainer: {
        flex: 1
    },
    instructionText: {
        marginBottom: 12
    },
    listContainer: {
        flex: 1,
        padding: 12
    }
})