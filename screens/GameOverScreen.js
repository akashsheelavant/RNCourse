import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from "react-native"
import PrimaryButton from "../components/game/PrimaryButton"
import Title from "../components/game/Title"
import Colors from "../constants/colors"

function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
    const { width, height } = useWindowDimensions()
    let imageSize = 300
    if (width < 380) {
        imageSize = 150
    }
    if (height < 400) {
        imageSize = 100
    }

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2
    }

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.rootContainer}>
                <Title>GAME OVER!</Title>
                <View style={[styles.imageContainer, imageStyle]}>
                    <Image style={styles.image} source={require('../assets/images/success.png')} />
                </View>
                <Text style={styles.summaryText}>Your phone needed <Text style={styles.highlightedText}>{roundsNumber}</Text> rounds to guess number <Text style={styles.highlightedText}>{userNumber}</Text>
                </Text>
                <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
            </View>
        </ScrollView>

    )
}

export default GameOverScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: 'hidden',
        margin: 36
    },
    image: {
        width: '100%',
        height: '100%'
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24
    },
    highlightedText: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500
    }
})