import React from 'react';
import { TouchableOpacity, View, Image, Text, Dimensions, Pressable, StyleSheet} from 'react-native';
import {Link, router, useLocalSearchParams } from "expo-router";

type produtoProps = {
    prdId: string;
    prdDescricao: string;
    prdReferencia: string;
    prdGrupo: number;
    prdLinha: number;
    prdCstUnitario: number;
    prdVdaUnitario: number;
    prdQtdEstoque: number;
    prdDscPermitido: number;
    prdStatus: string;
    prdUrlPhoto: string;
}

type paramsProps = {
  idUsr: string;
  name: string;
  title: string;
}

const LisProdutos = ({ data }:any) => {
  
  function handleDetalhes(){
    setTimeout(() => {
      handleGetToken()
    }, 1000)        
  }

  const { idUsr, name, title } = useLocalSearchParams<paramsProps>();
  
  const handleGetToken = async () => {
    //const token = await AsyncStorage.getItem('auth.token');
    
    //if (!token) {
    //    navigation.navigate('SignIn')
    //}else {
    //    navigation.navigate(data.srvLink)
    //}        
  }

    //<Link href={{pathname: "/Prodetalhes/[id]", params: { id: data.itePrmProId, idUsr, name, title}}} asChild>

  return (
    <View style={styles.container}>
    //<Link href={{pathname: "./Prodetalhe/[id]", params: { id: data.prdId, idUsr, name, title}}} asChild>
    <TouchableOpacity>
      <View style={styles.box}>
        <View>
          <Image source={{uri: `https://thumbs2.imgbox.com/${data.prdUrlPhoto}`}} resizeMode="cover" style={styles.imgLogo} />
          <View style={styles.boxDescricao}>
            <Text style={styles.txtDescricao}>{data.prdDescricao}</Text>
          </View>
          <View>
            <Text>{data.prdReferencia}</Text>
          </View>
          <View>
            <Text>R$ {data.prdVdaUnitario}</Text>
            <Text>/cada</Text>
          </View>
        </View>             
      </View>  
    </TouchableOpacity>
    </Link>
    </View>
  );
};
  
export default LisProdutos;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    imgLogo: {
        width: 180,
        height: 200,
        alignItems: 'center',
        borderRadius: 10,      
    },

    box: {
        backgroundColor: "#CCC",
        padding: 4,
        borderRadius: 10,
        marginTop: 5,
        marginRight: 5,
        marginBottom: 5,
    },
    
    boxDescricao: {
        width: "100%",
        height: 40,
    }, 

    txtDescricao: {
        fontSize: 15,
        fontWeight: '500'
    }
})