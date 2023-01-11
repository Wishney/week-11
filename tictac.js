let playerText = document.getElementById('playerText')
let restartButton = document.getElementById('restartButton')
let boxes = Array.from(document.getElementsByClassName('box'))

//boxes = 9 divs

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
//X's don't overide O's, empty boxes
let spaces = Array(9).fill(null)

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}
//dom element of box, e is the box, id is from HTML gameboard
function boxClicked(e) {
    const id = e.target.id

    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        //put alert here
        //if false was not returned we have winner
        if(playerHasWon() !==false){
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()
            alert("We Have A Winner!!!! Way to go!!!!!")
            //winning blocks in css
            winning_blocks.map(box => boxes[box].style.backgroundColor=winnerIndicator)
            return
            //mapping over boxes array
            
        }
        //change to whatever is not on the box, if x change to o, else change to x
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }
}
//number of boxes in row
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon() {

   for (const condition of winningCombos) {
        let [a, b, c] = condition
//if positions a,b,c are equal (x or o) then player has won
        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return[a,b,c]
        }
   }
   return false
}

restartButton.addEventListener('click', restart) 
//fill each box with null when restart
function restart() {
    spaces.fill(null)

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
        //change boxes back to original coler after game restart
    })

    playerText.innerHTML = 'Tic Tac Toe'

    currentPlayer = X_TEXT
}
startGame()