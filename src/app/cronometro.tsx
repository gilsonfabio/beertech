import { useState, useEffect } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { useNavigation, useRouter, useLocalSearchParams} from "expo-router";

import { api } from "@/server/api";
import { apicontrol } from "@/server/apicontrol";

export default function Cronometro() {
    const router = useRouter();
    const local = useLocalSearchParams();
    const navigation = useNavigation();

    const [segundos, setSegundos] = useState(0);
    const [minutos, setMinutos] = useState(0);
    const [customInterval, setCustomInterval] = useState<NodeJS.Timer>();
    const [atualiza, setAtualiza] = useState(0);

    const [count, setCount] = useState(0);
    
    let titulo = 'Consumo';

    useEffect(() => {
        
        if (atualiza === 0) {
            apicontrol({
                method: 'post',    
                url: `?s=GMCL1`,                 
            }).then(function(resp) {
                setAtualiza(atualiza + 1) 
            }).catch(function(error) {
                alert(`Falha no acesso aos produtos! Tente novamente.`);
            })
        }

        if (count <= 20) {
            setInterval(() => {
                setCount(count + 1) 
            }, 1000)
        }else {
            handleStop();
        }     
         
    }, [count]);

    const handleStop = () => {
    
        apicontrol({
            method: 'post',    
            url: `?s=GMCD1`,                 
        }).then(function(resp) {
            setAtualiza(atualiza + 1)
        }).catch(function(error) {
            alert(`Falha no acesso aos produtos! Tente novamente.`);
        })
            
        api.post('newconsumo', {
            conUsrId: local.idUsr,
            conPrdId: local.idPro,
            conPrdQtd: local.qtde,
            conPrdVlr: local.valor,
            sldDisponivel: local.saldo, 
        }).then(() => {
            alert('Consumo realizado com sucesso!')
        }).catch(() => {
            alert('Erro no cadastro!');
        }) 
        
        router.back(); 
    }

    return(
        <View style={styles.container}>
            <Text style={styles.txtContador}>
                Teste de contador
            </Text>
            <Text style={styles.txtContador}>
                {count}
            </Text>
            <View style={styles.box}>
                   
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    txtContador: {
        fontSize: 28,
        fontWeight: '500',
        marginTop: 20,
        marginBottom: 20,
    },

    box: {
        flexDirection: 'row',
    },

    boxPlay: {
        width: "30%",
        height: 40,
        backgroundColor: "#22c55e",
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
    },

    txtPlay: {
        fontSize: 16,
        fontWeight: '500',
        color: "#FFF",
    },

    boxPause: {
        width: "30%",
        height: 40,
        backgroundColor: "#eab308",
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
    },

    txtPause: {
        fontSize: 16,
        fontWeight: '500',
        color: "#FFF",
    },

    boxReset: {
        width: "30%",
        height: 40,
        backgroundColor: "#dc2626",
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },

    txtReset: {
        fontSize: 16,
        fontWeight: '500',
        color: "#FFF",
    },


})