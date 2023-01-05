import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

let timer = null;
let segundos = 0;
let minutos = 0;
let horas = 0;

function App() {

  const [tempo, setTempo] = useState(0);
  const [btn, setBtn] = useState('Iniciar');
  const [ultimo, setUltimo] = useState(null);

  function iniciar() {
    if(timer !== null) {
      // Aqui para o timer
      clearTimeout(timer);
      timer = null;
      setBtn('Iniciar');
    } else {
      // Iniciar o timer
      timer = setInterval( () => {
        
        segundos++;
        
        if(segundos == 60) {
          // Chegou a um minuto
          segundos = 0;
          minutos++;
        }
        if(minutos == 60) {
          // Chegou a uma hora
          minutos = 0;
          horas++;
        }

        // Formatação pra caso numero sejha menor que 10 não ficar somente o numero
        let format =  
          ( horas < 10 ? '0' + horas : horas ) + ':' +
          ( minutos < 10 ? '0' + minutos : minutos ) + ':' +
          ( segundos < 10 ? '0' + segundos : segundos );
        
        setTempo(format);
          
      },1000); // Executa a cada 1000 milesegundos
      
      setBtn('Pausar');
    }
  }
  function limpar() {
    if(timer !== null) {
      // Aqui para o timer
      clearTimeout(timer);
      timer = null;
    }
    setUltimo(tempo);
    setTempo(0);

    segundos = 0;
    minutos = 0;
    horas = 0;

    setBtn('Inicar');    
  }

  return (
    <View style={styles.container}>

      <Image 
        source={require('./src/crono.png')}
      />

      <Text style={styles.timer}>
        {tempo}
      </Text>

      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={iniciar}>
          <Text style={styles.btnTexto}>
            {btn}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={limpar}>
          <Text style={styles.btnTexto}>
            Resetar
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.areaUltima}>
        <Text style={styles.textoCorrido}> 
          { ultimo ? 'Ultimo tempo: '+ ultimo : ''}
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00aeef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff'
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 30
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    margin: 17,
    borderRadius: 9
  },
  btnTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef'
  },
  areaUltima: {
    marginTop: 40,
  },
  textoCorrido: {
    fontSize: 25,
    color: '#fff',
    fontStyle: 'italic'
  }
});

export default App;