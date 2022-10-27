export function generateBoard(gameState) {
    let { board: boardState, you } = GameState.parse(gameState)
    let board = []
    for (let i = 0; i < boardState.width; i++) {
        let row = []
        for (let j = 0; j < boardState.height; j++) {
            row.push({ type: 'empty' })
        }
        board.push(row)
    }
    boardState.food.forEach(f => board[f.x][f.y] = { type: 'food' })
    you.body.forEach((b,i)=>{
        board[b.x][b.y]={
            type:'you',
            next:i<you.body.length-1?you.body[i+1]:null,
            prev:i>0?you.body[i-1]:null
        }
    })
    boardState.snakes.filter(s=>s.id!=you.id).forEach(s=>{
        s.body.forEach((b,i)=>{
            board[b.x][b.y]={
                type:'enemy',
                next:i<s.body.length-1?s.body[i+1]:null,
                prev:i>0?s.body[i-1]:null
            }
        })
    })
    printBoard(board)
    return board
}

function printBoard(board) {
    let horizLine = ""
    board.forEach(() => horizLine += "----")

    for (let i= board[0].length-1; i >=0; i--) {
        console.log(horizLine);
        let rowString = ``
        for (let j = 0; j < board.length; j++) {
            rowString = rowString.concat('| ')
            switch (board[j][i].type) {
                case 'empty':
                    rowString = rowString.concat(' ')
                    break;
                case 'food':
                    rowString = rowString.concat('O')
                    break;
                case 'you':
                    rowString = rowString.concat('M')
                    break;
                case 'enemy':
                    rowString = rowString.concat('X')
                    break;

                default:
                    break;
            }
            rowString = rowString.concat(' ')
        }
        rowString = rowString.concat('|')
        console.log(rowString)
    }
    console.log(horizLine);
 
}

export function moveIsValid(x,y,board){
    let space = board[x][y]
    return space.type=='empty'||space.type=='food'
}