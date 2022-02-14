const grid = document.querySelector('#container')
let winner = ''
let gameOver = false
const pTurnValue = document.querySelector('#playerTurnNumber')

// add function to refresh button that clears values from squares and resets player turns
const refreshBoard = () => {
    const gridSquare = document.querySelectorAll('.gridSquare')
    for (let i = 0; i < 9; i++){
        gridSquare[i].innerText = ''
    }
    pTurnValue.innerText = 'X'
    winner = ''
    gameOver = false
}

// detect win conditions
const detectWinner = () => {
    const grid = document.querySelectorAll('.gridSquare')
    const player = pTurnValue.innerText
    if (grid[0].innerText === player && grid[3].innerText === player && grid[6].innerText === player){
        return true
    } else {
        return false
    }
}

// detect tie
const detectTie = () => {
    const square = document.querySelectorAll('.gridSquare')
    for (let i = 0; i < 9; i++){
        if (square[i].innerText === ''){
            return false
        }
    }
    return true
}

// clicking square will add X or O to the square
const addXorO = (event) => {
    // if square already has value don't add anything
    const square = event.target
    square.innerText = pTurnValue.innerText
}

// create the 9 squares from the single div
const createSquares = () => {for (let i = 0; i < 9; i++) {
    // console log to make sure loop runs 9 times
    console.log('make a square')
    // generate a div every loop
    const square = document.createElement('div')
    // add gridSquare class to that square
    square.classList.add('gridSquare');
    // append those divs to the container
    grid.appendChild(square)
    // add event listener
    square.addEventListener('click', (event) => {
        if (square.innerText !== '' || gameOver){
            return
        }
        addXorO(event)
        let isWinner = detectWinner()
        if (!isWinner){
            if (detectTie()){
                gameOver = true
            } else {
                setPlayerTurn()
            }
        } else {
            winner = pTurnValue.innerText
            gameOver = true
        }
        
    })
}}

// function to change player turns
const setPlayerTurn = () => {
    if (pTurnValue.innerText === 'X'){
        pTurnValue.innerText = 'O'
    } else {
        pTurnValue.innerText = 'X'
    }
}

// setting player turn value on page load
document.addEventListener('DOMContentLoaded', () => {
    createSquares()
    setPlayerTurn()
    document.querySelector('#refresh').addEventListener('click', refreshBoard)
})