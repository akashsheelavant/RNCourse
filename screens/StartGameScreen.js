import { useState } from "react"
import { View, TextInput, StyleSheet, Alert, Text } from "react-native"
import PrimaryButton from "../components/game/PrimaryButton"
import Title from "../components/game/Title"
import Colors from "../constants/colors"
import Card from "../components/ui/Card"
import InstructionText from "../components/ui/InstructionText"

function StartGameScreen({ onSelectingNumber }) {
    const [enteredNumber, setEnteredNumber] = useState('')

    function numberInputHandler(value) {
        setEnteredNumber(value)
    }

    function resetInputHandler() {
        setEnteredNumber('')
    }

    function confirmInputHandler() {
        const number = parseInt(enteredNumber)
        if (isNaN(number) || number <= 0 || number > 99) {
            Alert.alert('Invalid number',
                'Number has to be between 1 and 99',
                [{ text: 'okay', style: 'destructive', onPress: resetInputHandler }])
            return
        }
        onSelectingNumber(number)
    }

    return (
        <View style={styles.rootContainer}>
            <Title>Guess my Number</Title>
            <Card>
                <InstructionText>Enter a Number</InstructionText>
                <TextInput
                    style={styles.numberInput}
                    maxLength={2}
                    keyboardType='number-pad'
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={numberInputHandler}
                    value={enteredNumber}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonViewInnerContainer}>
                        <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                    </View>
                    <View style={styles.buttonViewInnerContainer}>
                        <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                    </View>
                </View>
            </Card>
        </View>
    )
}

export default StartGameScreen

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginTop: 100,
        alignItems: "center"
    },
    inputContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 36,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    buttonViewInnerContainer: {
        flex: 1
    }

})