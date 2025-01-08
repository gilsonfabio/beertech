import { View, Text, StyleSheet } from "react-native"
import { Stack } from "expo-router"

export default function RootLayout(){
    return(
        <Stack screenOptions={{}}>
            <Stack.Screen name="index" options={{headerShown: false}} />
            <Stack.Screen name="login" options={{title:'Login', headerShown: false}} />
            <Stack.Screen name="register" options={{title:'Register', headerShown: false}} />
            <Stack.Screen name="dashboard" options={{title:'Dashboard', headerShown: false}} />
            <Stack.Screen name="recarga" options={{title:'Recarga', headerShown: false}} />
            <Stack.Screen name="pagtopix" options={{title:'PagtoPix', headerShown: false}} />
            <Stack.Screen name="ProDetalhes" options={{title:'Detalhes', headerShown: false}} />
        </Stack>
    )
}

