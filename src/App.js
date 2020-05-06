import React, { Component } from 'react';
import './App.css';

import {connect} from 'react-redux';

class App extends Component{
  constructor(props){
    super(props)
    this.myRef = React.createRef()
    this.state = {
      active: false,
      deltaX: 0,
      deltaY: 0
    }
  }

  cancelAnimate(){
    this.setState({
      active: false
    })
  }

  render(){
    let gotN = this.props.n
    let self = this
    return (
      <div className="App">
        <p>你点击了 <span className="number">{this.props.n}</span> 次</p>
        <div className="btns">
          <button onClick={(e)=>this.props.add1(e,self)} className="add1"
            ref={this.myRef}
          >
            {this.state.active ?
              <span className="dot" style={{top: this.state.deltaY, left: this.state.deltaX}}
              onAnimationEnd={this.cancelAnimate.bind(this)}></span>
            : ''}
            就+1
          </button>
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
    add1(e,self){
      let {clientX, clientY} = e
      let {x, y} = self.myRef.current.getBoundingClientRect()
      let deltaX = clientX - x - 6
      let deltaY = clientY - y - 6

      self.setState({
        active: true,
        deltaX: deltaX,
        deltaY: deltaY
      })

      dispatch({type: 'add', payload: 1})
    },
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

