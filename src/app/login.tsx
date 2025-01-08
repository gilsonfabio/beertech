import { useState } from "react";
import { Text, View, StyleSheet, Image, TextInput, Pressable, Alert  } from "react-native";
import { router, useNavigation, useRouter, useLocalSearchParams, Link } from "expo-router";
import { isAxiosError } from "axios"
import { api } from '@/server/api'


export default function Login(){
    const navigation = useNavigation();
    const router = useRouter();
    const params = useLocalSearchParams();
    const { expoPushToken } = params;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let title = 'Produtos';
     
    async function handleSignIn() {
        try {
          const response = await api.post(`/signIn`, {
            email,
            password,
          })
          let id = response.data.id;  
          let nomCliente = response.data.name;
          let saldo = response.data.saldo;
          router.push(`/dashboard?idUsr=${id}&name=${nomCliente}&title=${title}&saldo=${saldo}` as any );          
        } catch (error) {
          if (isAxiosError(error)) {
            return Alert.alert(error.response?.data)
          }
          Alert.alert("Não foi possÃ­vel entrar.")
        }
    }

    async function handleCadastro() {
        router.push(`/`);          
    }

    return(
        <View style={styles.container}>
            <Text style={styles.txtContainer}>Login</Text>
            <View>
                <Image source={require('@/assets/images/logowhite.png')} alt="" resizeMode="cover" style={styles.imgLogo} />
            </View>
            <Text style={styles.label}>Email</Text>
            <TextInput 
                style={styles.input}
                placeholderTextColor="#fafafa" 
                placeholder="Informe seu email" 
                onChangeText={setEmail} 
                value={email} 
            />
            <Text style={styles.label}>Senha</Text>
            <TextInput 
                style={styles.input} 
                secureTextEntry 
                placeholderTextColor="#fafafa"
                placeholder="Informe sua Senha" 
                onChangeText={setPassword} 
                value={password} 
            />
            <Pressable style={styles.button} onPress={handleSignIn}>
                <Text style={styles.txtButton}>Entrar</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#020617",
        alignItems: 'center',
    },

    txtContainer: {
        marginTop: 50,
        fontSize: 36,
        fontWeight: "bold",
        color: "#facc15",
    },

    imgLogo: {
        width: 150,
        height: 150,
        alignItems: 'center', 
        marginBottom: 50,            
    }, 

    label: {
        width: 350,
        fontSize: 10,
        color: "#fafafa",
        paddingHorizontal: 10,
        marginTop: 10,
    },

    input: {
        width: 350,
        height: 50,
        margin: 12,
        borderWidth: 1,
        borderColor: "#facc15",
        borderRadius: 10,
        padding: 10,
        color: "#FFF",
        fontSize: 18,
    },

    button: {
        marginTop: 50,
        width: 350,
        height: 40,
        backgroundColor: "#facc15",
        borderRadius: 8,
        justifyContent: 'center',
    },

    txtButton: {
        fontSize: 22,
        fontWeight: 'bold',
        color: "#000",
        textAlign: 'center',
    },

})