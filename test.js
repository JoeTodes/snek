import { generateBoard, moveIsValid } from "./boardArray";
let badSnek1 = {
    "id": "456",
    "name": "bad snek",
    "health": 54,
    "body": [
        { "x": 9, "y": 9 },
        { "x": 9, "y": 10 },
        { "x": 10, "y": 10 }
    ],
    "latency": "123",
    "head": { "x": 10, "y": 10 },
    "length": 3,
    "shout": "why are we shouting??",
    "squad": "1",
    "customizations": {
        "color": "#26CF04",
        "head": "smile",
        "tail": "bolt"
    }
}

let sample = {
    game: {
        "id": "totally-unique-game-id",
        "ruleset": {
            "name": "standard",
            "version": "v1.2.3"
        },
        "map": "standard",
        "timeout": 500,
        "source": "league"
    },
    turn: 2,
    you: {
        "id": "123",
        "name": "Sneky McSnek Face",
        "health": 54,
        "body": [
            { "x": 0, "y": 0 },
            { "x": 1, "y": 0 },
            { "x": 2, "y": 0 }
        ],
        "latency": "123",
        "head": { "x": 0, "y": 0 },
        "length": 3,
        "shout": "why are we shouting??",
        "squad": "1",
        "customizations": {
            "color": "#26CF04",
            "head": "smile",
            "tail": "bolt"
        }
    },
    board: {

        "height": 11,
        "width": 11,
        "food": [
            { "x": 5, "y": 5 },
            { "x": 9, "y": 0 },
            { "x": 2, "y": 6 }
        ],
        "hazards": [
            { "x": 0, "y": 0 },
            { "x": 0, "y": 1 },
            { "x": 0, "y": 2 }
        ],
        "snakes": [
            badSnek1
        ]
    }
}

let board =generateBoard(sample)
console.log(moveIsValid(9,9, board))