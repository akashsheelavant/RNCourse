import { View, Text, SafeAreaView, Pressable, StyleSheet } from "react-native"

function PrimaryButton({ children }) {
    function pressHandler() {

    }

    return (
        <SafeAreaView>
            <View style={styles.buttonOuterContainer}>
                <Pressable android_ripple={'white'}
                    style={({ pressed }) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer}
                    onPress={pressHandler}>
                    <Text style={styles.buttonText}>{children}</Text>
                </Pressable>
            </View>
        </SafeAreaView >
    )
}

export default PrimaryButton

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden'
    },
    buttonInnerContainer: {
        backgroundColor: '#72365c',
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    pressed: {
        opacity: 0.75
    }
})
