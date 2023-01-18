import { View, Text, SafeAreaView } from "react-native"

function PrimaryButton({ children }) {
    return (
        <SafeAreaView>
            <View>
                <Text>{children}</Text>
            </View>
        </SafeAreaView>
    )
}

export default PrimaryButton

