import { Text, View, StyleSheet } from "react-native";

export default function Prodetalhe(){
    return(
        <View>
            <Text>Detalhes Page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "#020617",
        alignItems: 'center',
    },

    box: {
        width: 300,
        height: 300,
        backgroundColor: "#facc15",
    },


})