import React, {
  useState, useMemo, useRef, forwardRef, createContext, useContext, 
} from 'react'

// 测试React Hooks
const CountContext = createContext({})
const MsgContext = createContext({})
export default function Parent() {
  const [count, setCount] = useState(0)
  const [msg, setMsg] = useState('')
  let ref = useRef(0)
  let inputRef = useRef(null)

  const handleClick = (params) => {
    setCount(count + 1)
    setMsg(params)
    console.log(ref.current++)
    console.log(inputRef.current?.value)
  }

  return (
    <CountContext.Provider value={{ count }}>
      <MsgContext.Provider value={{ msg }}>
        <div className="hooks_test">
          <button onClick={ handleClick }>Parent点击</button>
          <Child count={ count } msg={ msg } cb={ handleClick } ref={ inputRef } />
          <Board />
        </div>
      </MsgContext.Provider>
    </CountContext.Provider>
  )
}

const Child = forwardRef((props:any, ref:any) => {
  const count:any = useContext(CountContext)
  const msg:any = useContext(CountContext)
  return (
    <div>
      <div>{ props.count } - child - { props.msg }</div>
      <div>context: { count.count } { msg.msg }</div>
      <button onClick={ () => props.cb('child clicked: ') }>Child点击</button>
      <input type="text" ref={ ref } />
    </div>
  )
})

const Board = () => {
  const [xIsNext, setXIsNext] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(''))

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) return;
    const nextSquares = squares.slice()
    if (xIsNext) {
      nextSquares[i] = 'X'
    } else {
      nextSquares[i] = 'O'
    }
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  const winner = calculateWinner(squares)
  let curStatus = ''
  if (winner) {
    curStatus = '赢家是：' + winner
  } else {
    curStatus = '下一个玩家是：' + (xIsNext ? 'X' : 'O')
  }

  return (
    <>
      <h3>井字棋游戏</h3>
      <div>{ curStatus }</div>
      <div className="board">
        <Square value={ squares[0] } onSquareClick={ () => handleClick(0) } />
        <Square value={ squares[1] } onSquareClick={ () => handleClick(1) } />
        <Square value={ squares[2] } onSquareClick={ () => handleClick(2) } />
        <Square value={ squares[3] } onSquareClick={ () => handleClick(3) } />
        <Square value={ squares[4] } onSquareClick={ () => handleClick(4) } />
        <Square value={ squares[5] } onSquareClick={ () => handleClick(5) } />
        <Square value={ squares[6] } onSquareClick={ () => handleClick(6) } />
        <Square value={ squares[7] } onSquareClick={ () => handleClick(7) } />
        <Square value={ squares[8] } onSquareClick={ () => handleClick(8) } />
      </div>
    </>
  )
}

const Square = ({ value, onSquareClick }) => {
  return (
    <div className="square" onClick={ onSquareClick }>{ value }</div>
  )
}

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i=0; i<lines.length; i++) {
    const [a, b, c] = lines[i]
    // 三子连线就算赢
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return ''
}