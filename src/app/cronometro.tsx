import { useState, useEffect } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

import { apicontrol } from "@/server/apicontrol";

export default function Cronometro() {
    const [segundos, setSegundos] = useState(0);
    const [minutos, setMinutos] = useState(0);
    const [customInterval, setCustomInterval] = useState<NodeJS.Timer>();

    useEffect(() => {
        /*
        apicontrol({
            method: 'get',    
            url: `?s=GCML1`,                 
        }).then(function(resp) {
            setInterval(() => {
                changeTime()
            }, 1000) 

        }).catch(function(error) {
            alert(`Falha no acesso as produtos! Tente novamente.`);
        })
        */
        setInterval(() => {
            changeTime()
        }, 1000)                  
    }, []);


    const startTimer = () => {
        setCustomInterval(
            setInterval(() => {
                changeTime()
            }, 1000) 
        )
    }

    const stopTimer = () => {
        if (customInterval) {
            clearInterval(Number(customInterval))
        }
    }

    const clear = () => {
        stopTimer();
        setSegundos(0);
        setMinutos(0);
    }

    const changeTime = () => {
        setSegundos((prevState) => {
            if (prevState + 1 == 60) {
                setMinutos(minutos + 1)
                return 0;
            }
            return prevState + 1; 
        })
    }

    return(
        <View style={styles.container}>
            <Text style={styles.txtContador}>
                {minutos < 10 ? "0" + minutos : minutos}:
                {segundos < 10 ? "0" + segundos : segundos}
            </Text>
            <View style={styles.box}>
                <View style={styles.boxPlay}>
                    <Pressable onPress={startTimer}>
                        <Text style={styles.txtPlay}>Iniciar</Text>
                    </Pressable>
                </View>    
                <View style={styles.boxPause}>
                    <Pressable onPress={stopTimer}>
                        <Text style={styles.txtPause}>Pausar</Text>
                    </Pressable>
                </View>
                <View style={styles.boxReset}>
                    <Pressable onPress={clear}>
                        <Text style={styles.txtReset}>Reset</Text>
                    </Pressable>
                </View>    
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