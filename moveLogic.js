export default function move(gameState) {
    const head = gameState.you.body[0];
    let moves = {
        up: {
            safe: true,
            x: head.x,
            y: head.y + 1,
            food: gameState.board.food.map(f => f.y - head.y - 1)
        },
        down: {
            safe: true,
            x: head.x,
            y: head.y - 1,
            food: gameState.board.food.map(f => -(f.y - head.y + 1))
        },
        left: {
            safe: true,
            x: head.x - 1,
            y: head.y,
            food: gameState.board.food.map(f => -(f.x - head.x + 1))
        },
        right: {
            safe: true,
            x: head.x + 1,
            y: head.y,
            food: gameState.board.food.map(f => f.x - head.x - 1)
        },
    };

    console.log(`Food: up:${moves.up.food} down:${moves.down.food} left:${moves.left.food} right:${moves.right.food}`);

    //avoid walls
    if (head.x == 0) moves.left.safe = false
    if (head.y == 0) moves.down.safe = false
    if (head.x == gameState.board.width - 1) moves.right.safe = false
    if (head.y == gameState.board.height - 1) moves.up.safe = false

    //avoid all snake parts TODO: ignore tail unless about to get food
    gameState.board.snakes.forEach((snake) => {
        snake.body.forEach(cell => {
            Object.keys(moves).forEach(move => {
                if (sameSpace(moves[move], cell)) {
                    moves[move].safe = false
                }
            })
        })
    })

    //filter out safe moves
    const safeMoves = Object.keys(moves).filter(direction => moves[direction].safe);
    if (safeMoves.length == 0) {
        console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
        return { move: "down" };
    }

    // Choose a random move from the safe moves if no food
    let nextMove
    
    // Move to closest food if below half health or uneven length
    if (gameState.you.health <= 20 || gameState.you.length%2!=0) {
        let best = safeMoves[0]
        let bestFood = Math.max(gameState.board.width, gameState.board.height)
        safeMoves.forEach(move => {
            moves[move].food.forEach((f) => {
                if (f >= 0 && f < bestFood) {
                    best = move
                    bestFood = f
                    console.log({ bestFood });
                }
            })
        })
        nextMove = best
    } else { //chase tail
        Object.keys(moves).forEach(move => {
            if (sameSpace(moves[move], gameState.you.body.at(-1))) {
                nextMove = move
            }
        })
        if (!nextMove){
            let neck = gameState.you.body[1]
            if(sameSpace(neck, moves.down)&&safeMoves.includes("up"))nextMove="up"
            if(sameSpace(neck, moves.down)&&safeMoves.includes("right"))nextMove="right"
            if(sameSpace(neck, moves.up)&&safeMoves.includes("down"))nextMove="down"
            if(sameSpace(neck, moves.up)&&safeMoves.includes("left"))nextMove="left"
            if(sameSpace(neck, moves.left)&&safeMoves.includes("right"))nextMove="right"
            if(sameSpace(neck, moves.left)&&safeMoves.includes("down"))nextMove="down"
            if(sameSpace(neck, moves.right)&&safeMoves.includes("left"))nextMove="left"
            if(sameSpace(neck, moves.right)&&safeMoves.includes("up"))nextMove="up"
        }
        
        
    }
    
    //last resort - random move
    if(!nextMove)nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];
    
    console.log(`MOVE ${gameState.turn}: ${nextMove}`)
    return { move: nextMove };
}

function sameSpace(a, b) {

    return (a.x == b.x && a.y == b.y)

}