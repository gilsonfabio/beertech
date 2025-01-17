import React, { useState, useEffect} from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking, Pressable, Alert } from "react-native"
import { Ionicons, AntDesign } from '@expo/vector-icons';

import { api } from '@/server/api';
import { useNavigation, useRouter, useLocalSearchParams, Link } from "expo-router";
import Header from '@/components/header';
import { isAxiosError } from "axios"

type produtoProps = {
    idProd: string;
    proDescricao: string;
    proReferencia: string;
    proSegmento: number;
    proMarca: number;
    proGrupo: number;
    proLinha: number;
    proCodBarra: number;
    proUnidade: string;
    proCodNcm: number;
    proUltCusto: number;
    proPreVenda: number;
    proTributacao: string;
    proCodCst: number;
    proStatus: string;
    proAvatar: string;
}

type paramsProps = {
    idUsr: string;
    name: string;
    title: string;
    saldo: string;
}

export default function Prodetalhe(){
    const [produtos, setProdutos] = useState<Array<produtoProps>>([]);
    const local = useLocalSearchParams();

    const [proAvatar, setProAvatar] = useState('');
    const [proDescricao, setProDescricao] = useState('');
    const [proReferencia, setProReferencia] = useState('');
    const [proVlrVenda, setProVlrVenda] = useState('');

    const [atualiza, setAtualiza] = useState(0);
    const [qtde, setQtde] = useState(0);
    const [vlrTotal, setVlrTotal] = useState(0);

    const [user, setUser] = useState(0);
    const [usrSaldo, setUsrSaldo] = useState(0);
    const [usrNome, setUsrNome] = useState(0);

    const navigation = useNavigation();
    const router = useRouter();

    const [carshop, setCarShop] = useState([]);
    const [count, setCount] = useState(0);

    let usuario = local.idUsr;
    let nomUsuario = local.name;
    let titulo = 'Detalhes';
        
    useEffect(() => {
        let id = local.idUsr;
        api({
            method: 'get',    
            url: `searchSaldo/${id}`,                 
        }).then(function(resp) {
            setUser(resp.data[0].usrId)
            setUsrNome(resp.data[0].usrNome)  
            setUsrSaldo(resp.data[0].usrSldDisponivel)        
        }).catch(function(error) {
            alert(`Falha no acesso do saldo do usuário! Tente novamente.`);
        }) 

        let idPro = local.id;
        api({
            method: 'get',    
            url: `searchPro/${idPro}`,                 
        }).then(function(response) {
            setProdutos(response.data)  
            setProAvatar(response.data.proAvatar)
            setProDescricao(response.data.proDescricao)
            setProReferencia(response.data.proReferencia)
            setProVlrVenda(response.data.proPreVenda)
            
            setQtde(qtde + 1) 
            setVlrTotal(response.data.proPreVenda)
        
        }).catch(function(error) {
            alert(`Falha no acesso ao produto! Tente novamente.`);
        })       
                                  
    }, []);

    async function onPress() {
        try {
          router.push(`/cronometro` as any );          
        } catch (error) {
          if (isAxiosError(error)) {
            return Alert.alert(error.response?.data)
          }
          Alert.alert("Não foi possÃ­vel entrar.")
        }
    }

    return(
        <View style={styles.container}>            
            <Header user={usuario.toString()} nomUser={nomUsuario.toString()} sysTitle={titulo} />
            <View style={styles.box}>
                <View>
                     <Image source={{uri: `https://thumbs2.imgbox.com/d9/79/uhgnjIks_t.jpg`}} resizeMode="contain" width={100} height={100} style={styles.imgLogo}/>
                </View>                
                <View style={styles.boxDescricao}>
                    <Text style={styles.txtDescricao}>{proDescricao}</Text>
                </View>
                <View style={styles.boxReferencia}>
                    <Text style={styles.txtReferencia}>{proReferencia}</Text>
                </View>                
            </View>     
            <View style={styles.boxTamanho}>
                <View style={styles.button}>
                    <Pressable onPress={onPress}> 
                        <View style={styles.boxImg}>                      
                            <Ionicons name="beer" size={30} color="black" />
                        </View>
                        <View>                      
                            <Text style={styles.txtPeq} >100 ml</Text>
                        </View>
                        <View>                      
                            <Text style={styles.prcPeq}>R$ 3,00</Text>
                        </View>
                    </Pressable>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={onPress}> 
                        <View style={styles.boxImg}>                      
                            <Ionicons name="beer" size={40} color="black" style={styles.imgPeq}/>
                        </View>
                        <View>                      
                            <Text style={styles.txtMed}>300 ml</Text>
                        </View>
                        <View >                      
                            <Text style={styles.prcMed}>R$ 7,00</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={onPress}> 
                        <View style={styles.boxImg}>                      
                            <Ionicons name="beer" size={60} color="black" />
                        </View>
                        <View >                      
                            <Text style={styles.txtGrd}>500 ml</Text>
                        </View>
                        <View >                      
                            <Text style={styles.prcGrd}>R$ 9,00</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>        
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },

    box: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    boxDescricao: {
        width: "90%",
        height: 'auto',
        marginTop: 30,
    },

    txtDescricao: {
        fontSize: 18,
        fontWeight: '500',
    },

    boxReferencia: {
        width: "90%",
        height: 'auto',
        marginBottom: 30,
    },

    txtReferencia: {
        fontSize: 18,
        fontWeight: '500',
    },

    imgLogo: {
        width: 300,
        height: 300,
    },

    boxTamanho: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },

    button: {
        flexDirection: 'column',
        width: 120,
        height: 120,
        backgroundColor: "#CCC",
        borderRadius: 12,
        padding: 10,
        marginLeft: 5,
    },

    boxImg: {
        width: "100%",
        height: 60,
        alignContent: 'center',
        alignItems: 'center',
    },

    imgPeq: {
        alignContent: 'center',
    },

    txtPeq: {
        fontSize: 12,
        fontWeight: '500',
    },

    prcPeq: {
        fontSize: 18,
        fontWeight: '800',
        color: "#dc2626"
    },

    txtMed: {
        fontSize: 12,
        fontWeight: '500',
    },

    prcMed: {
        fontSize: 18,
        fontWeight: '800',
        color: "#dc2626"
    },
   
    txtGrd: {
        fontSize: 12,
        fontWeight: '500',
    },

    prcGrd: {
        fontSize: 18,
        fontWeight: '800',
        color: "#dc2626"
    }
})