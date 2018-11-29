/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

type Props = {};
export default class App extends Component<Props> {

    //application components
    constructor(){
      super()
      this.state = {
        resultText: "",
        calculationText:""
      }
      this.operations = ['DEL','+','-','*','/']
    }


    //Result Calculate Function
    calculateResult(){
      const text = this.state.resultText
      console.log(text, eval(text))
      this.setState({   
          calculationText: eval(text)
      })
      //eval(text)
      
    }

    //validate button press
    validate(){
      const text = this.state.resultText
      switch (text.slice(-1)) {
        case '+':
        case '-':
        case '*':
        case '/':
          return false
      }
      return true
    }

    //Button Press called Function
    buttonPressed(text){
      console.log(text)

      if (text == '=') {
        return this.validate() && this.calculateResult()
      }

      this.setState({
        resultText: this.state.resultText + text
      })
    }
   
   //
   operate(operation){
     switch (operation) {
        case 'DEL':
            const text = this.state.resultText.split('')
            text.pop()
            this.setState({
                resultText : text.join('')
            })
            break
        case '+':
        case '-':
        case '*':
        case '/':
          const lastChar = this.state.resultText.split('').pop()

          if(this.operations.indexOf(lastChar) > 0)  return

          if(this.state.text == "") return
          this.setState({
            resultText: this.state.resultText + operation
          })
     }
   }
 

  //main render function to have layout
  render() {

    //number button layout
    let rows = []
    let nums = [[7,8,9],[4,5,6],[1,2,3],['.',0,'=']]
    for (let i = 0; i < 4; i++) {
      let row = []
      for (let j = 0; j < 3; j++) {
        row.push(<TouchableOpacity key={nums[i][j]} onPress={()=> this.buttonPressed(nums[i][j])} style={styles.btn}>
                <Text style={styles.btnText}>{nums[i][j]}</Text>
              </TouchableOpacity>);
      }
      rows.push(<View key ={i} style={styles.row}>{row}</View>)
    }

    //operation button layout
    let ops = []
    for (let i = 0; i < 5; i++) {
      ops.push(
              <TouchableOpacity key={this.operations[i]} style={styles.btn} onPress={()=> this.operate(this.operations[i])}>
                <Text style={[styles.btnText, styles.white]}>{this.operations[i]}</Text>
              </TouchableOpacity>
              )
    }

    //layout views
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>
            {this.state.resultText}
          </Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.calculationText}</Text>
        </View>
        <View style={styles.buttons}>
           <View style={styles.numbers}>
            {rows}
          </View> 

          
          <View style={styles.operations}>
            {ops}
          </View>

        </View>
        
      </View>
    );
  }
}

//style scripts for each view component
const styles = StyleSheet.create({
  container:{
    flex:1
  },
  white:{
    color:'white'
  },
  result:{
    flex:2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems:'flex-end'
  },
  btnText:{
    fontSize: 40,
    color:'white'
  },
  btn:{
    flex:1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent:'center'
  },
  resultText:{
    fontSize: 30,
    color: '#939393'
  },
  calculation:{
    flex:1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems:'flex-end'
  },
  calculationText:{
    fontSize: 50,
    color: '#828282'
  },
  buttons:{
    flex: 7,
    flexDirection:'row'
  },
  row:{
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems:'center'
  },
  numbers:{
    flex:3,
    backgroundColor:'#434343'
    
  },
  operations:{
    flex:1,
    justifyContent: 'space-around',
    backgroundColor:'#636363'
  }
});
