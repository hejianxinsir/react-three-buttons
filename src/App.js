import React, { Component } from 'react';
import './App.css';

import {connect} from 'react-redux';

class App extends Component{
  render(){
    let gotN = this.props.n
    return (
      <div className="App">
        <p>你点击了 {this.props.n} 次</p>
        <div className="btns">
          <button onClick={()=>this.props.add1()}>就+1</button>
          <button onClick={()=>this.props.addAfterOneSec()}>一秒后+1</button>
          <button onClick={()=>this.props.addIfOdd(gotN)}>单数则+1</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    n: state.n
  }
}

function mapDispatchToProps(dispatch){
  return {
    add1(){ dispatch({type: 'add', payload: 1}) },
    addAfterOneSec(){ 
      setTimeout(
        ()=> dispatch({type: 'add', payload: 1}) 
      ,1000)
    },
    addIfOdd(x){
      if(x % 2 === 1){
       dispatch({type: 'add', payload: 1})
      }else{
        console.log('非单数，不操作')
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

