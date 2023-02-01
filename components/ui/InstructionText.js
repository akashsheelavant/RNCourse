import { Text, StyleSheet } from "react-native"
import Colors from "../../constants/colors"

function InstructionText({ children }) {
    return <Text style={styles.inputText}>{children}</Text>
}

export default InstructionText

const styles = StyleSheet.create({
    inputText: {
        color: Colors.accent500,
        fontSize: 24
    }
})