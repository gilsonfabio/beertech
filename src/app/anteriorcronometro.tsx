import { useState } from "react"
import { View, Text, Pressable, StyleSheet } from "react-native";


export default function Cronometro(){
  const [tempo, setTempo] = useState(30);
  const [intervalo, setIntervalo] = useState<any>(null);

  const iniciaCronometro = () => {
    setIntervalo(
      setInterval(() => {
        setTempo((tempo) => tempo - 1 );
      }, 1000)      
    )        
  }

  const pausaCronometro = () => {
    clearInterval(intervalo)
    setIntervalo(null)
  }

  const resetCronometro = () => {
    clearInterval(intervalo)
    setIntervalo(null)
    setTempo(30)
  }

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Cronometro</Text>
      <Text style={styles.result}>{tempo} segundos</Text>
      <View style={styles.box}>
        <View style={styles.btnPlay}>
          <Pressable onPress={iniciaCronometro}>
            <Text style={styles.txtPlay}>Inicio</Text>
          </Pressable> 
        </View>
        <View style={styles.btnPausa}>
          <Pressable onPress={pausaCronometro}>
            <Text style={styles.txtPause}>Pausa</Text>
          </Pressable> 
        </View>
        <View style={styles.btnReset}>
          <Pressable onPress={resetCronometro}>
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
    backgroundColor: "#f4f4f5",
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 22,
    fontWeight: '500',
    color: "#b91c1c",
  },

  result: {
    fontSize: 28,
    fontWeight: '500',
    color: "#000",
    marginTop: 60,
    marginBottom: 60,
  },

  box: {
    flexDirection: 'row',
    width: "90%",
    alignContent: 'center'

  },

  btnPlay: {
    width: '30%',
    height: 40,
    backgroundColor: "#22c55e",
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    marginRight: 10,
  },

  txtPlay: {
    fontSize: 14,
    fontWeight: '500',
    color: "#000" 
  },

  btnPausa: {
    width: '30%',
    height: 40,
    backgroundColor: "#facc15",
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    marginRight: 10,
  },

  txtPause: {
    fontSize: 14,
    fontWeight: '500',
    color: "#000" 
  },

  btnReset: {
    width: '30%',
    height: 40,
    backgroundColor: "#dc2626",
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
  },
  txtReset: {
    fontSize: 14,
    fontWeight: '500',
    color: "#000" 
  },

})