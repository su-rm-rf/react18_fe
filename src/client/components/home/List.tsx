import React, { Component, ReactNode } from "react"
import PropTypes from 'prop-types'

export default class List extends Component<{}, {
  list: Array<string>
  listToChild: Array<string>
  cbData: string
}> {
  constructor(props) {
    super(props)
    console.log(11)
    this.state = {
      list: ['a', 'b', 'c'],
      listToChild: ['a', 'b', 'c'],
      cbData: '',
    }
    this.setList = this.setList.bind(this)
    this.setListToChild = this.setListToChild.bind(this)
    this.getFromChild = this.getFromChild.bind(this)
    console.log(12)
  }
  setList() {
    this.setState({
      list: ['a', 'b', 'c', 'fff']
    })
  }
  setListToChild() {
    this.setState({
      listToChild: ['a', 'b', 'c', 'f']
    })
  }
  getFromChild(data) {
    this.setState({
      cbData: data
    })
  }
  UNSAFE_componentWillMount() {
    console.log(13)
  }
  componentDidMount() {
    console.log(14)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(15, nextProps)
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log(16, nextProps, nextState, nextContext)
      return true
  }
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    console.log(17, nextProps, nextState)
  }
  componentDidUpdate(prevProps, prevState, snapshot?) {
    console.log(18, prevProps, prevState, snapshot)
  }
  componentWillUnmount() {
    console.log(19)
  }
  render(): ReactNode {
    console.log('render 1')
    return (
      <div style={{color: '#00f', 'margin': '1rem 0'}}>
        <button onClick={ this.setList.bind(this) }>更新我自己</button>
        <div>展示我自己：
          { 
            this.state.list.map(item => 
              <div key={item}>{item}</div>
            ) 
          }
        </div>
        <button onClick={ this.setListToChild.bind(this) }>更新并传给儿子</button>
        <div>显式儿子的内容：
          <Item listToChild={ this.state.listToChild } cbToParent={ this.getFromChild.bind(this) } />
        </div>
        <div>显式儿子的回调内容：{ this.state.cbData }</div>
      </div>
    )
  }
}

class Item extends Component<{
  listToChild: Array<string>
  cbToParent: Function
}, {
  num: number
}> {
  constructor(props) {
    super(props)
    console.log(21)
    this.state = {
      num: 1
    }
    this.setNum = this.setNum.bind(this)
    this.cbToParent = this.cbToParent.bind(this)
    console.log(22)
  }
  static defaultProps = {
    child2: ['data', 'by', 'self']
  }
  static propTypes = {
    listToChild: PropTypes.array.isRequired,
    cbToParent: PropTypes.func.isRequired,
  }
  setNum() {
    this.setState({
      num: this.state.num + 1
    })
  }
  cbToParent() {
    this.props.cbToParent('传给老子的回调信息')
  }
  componentDidCatch(error, info) {
    console.log(error, info)
  }

  UNSAFE_componentWillMount() {
    console.log(23)
  }
  componentDidMount() {
    console.log(24)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(25, nextProps)
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log(26, nextProps, nextState, nextContext)
    return true
  }
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    console.log(27, nextProps, nextState)
  }
  componentDidUpdate(prevProps, prevState, snapshot?) {
    console.log(28, prevProps, prevState, snapshot)
  }
  componentWillUnmount() {
    console.log(29)
  }
  forceUpdate(callback?) {
    console.log(callback)
  }
  // getFromChildContext() {
  //   console.log()
  // }
  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   console.log(prevProps, prevState)
  //   return prevProps
  // }
  render(): ReactNode {
    console.log('render 2', this.props)
    return (
      <div style={{color: '#f00', 'margin': '1rem 0'}}>
        <button onClick={ this.setNum.bind(this) }>更新我自己</button>
        <div>展示我自己：{ this.state.num }</div>
        <div>from 老子：
          { 
            this.props.listToChild.map(item => 
              <div key={item}>{item}</div>
            ) 
          }
        </div>
        <button onClick={ this.cbToParent.bind(this) }>更新并传给老子</button>
      </div>
    )
  }
}