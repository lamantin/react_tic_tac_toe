import React, {
    Component
} from 'react'
import Api, {
    saveBoard,
    getBoardById,
    listBoardUrl
} from './Api'
import GameList from './GameList'
import Board,{render} from './Board';


export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xIsNext: true,
            stepNumber: 0,
            history: [{
                squares: Array(9).fill(null)
            }]
        }

    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }
    handlemap(arrayItem) {
        if (arrayItem === 'X') {
            return 1;
        }
        if (arrayItem === 'O') {
            return 2;
        }
        if (arrayItem === null) {
            return 0;
        }
    }
    saveboard() {
        //x=1,O=2;
        let board = '';
        let name = (Math.random() + 1).toString(36).substring(7);
        let currentBoard = this.state.history[this.state.history.length - 1];
        const Arr = currentBoard.squares.map(this.handlemap);
        board = Arr.toString().replaceAll(",", "");
        new Api().saveBoard(board, name);
    }

    setboard(json) {

        let compressed_board = json.board;

        let squares_array = Array.from(String(compressed_board), Number);
        squares_array = squares_array.map(function(item) {
            if (item === 0) {
                return null;
            }
            if (item === 2) {
                return 'O';
            }
            if (item === 1) {
                return 'X';
            }
        });
        let history = [{
            squares: squares_array
        }];

        this.state = {
            xIsNext: true,
            stepNumber: 0,
            history: [{
                squares: squares_array
            }]
        }


        this.render(history);
        
    }
    loadboard(id) {
        fetch(
                listBoardUrl + '/' + id)
            .then((res) => res.json())
            .then((json) => {
                this.setboard(json);

            })
        console.log('LOADED GAME:');
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);

        const current = history[history.length - 1];

        const squares = current.squares.slice();
        const winner = calculateWinner(squares);
        if (winner || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat({
                squares: squares
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });

    }

    render(oldhistory = false) {
        console.log('RENDER');
        const history = (oldhistory === false) ? this.state.history : oldhistory;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ? '' + move : 'Start the Game';
            return ( <
                li key = {
                    move
                } >
                <
                button onClick = {
                    () => {
                        this.jumpTo(move)
                    }
                } > {
                    desc
                } <
                /button> <
                /li>
            )
        });

        let status;
        if (winner) {
            status = 'Winner is ' + winner;
        } else {
            status = 'Next Player is ' + (this.state.xIsNext ? 'X' : 'O');
        }


        return (

            <
            div className = "game" >
            <
            div className = "game-board" >
            <
            Board onClick = {
                (i) => this.handleClick(i)
            }
            squares = {
                current.squares
            }
            /> <
            /div> <
            div className = "game-info" >
            <
            div > {
                status
            } < /div> <
            div >
            <
            button onClick = {
                () => {
                    this.saveboard()
                }
            } > {
                'save Booard'
            } <
            /button> <
            /div> <
            /div> <
            div className = "game-info" >
            <
            button onClick = {
                () => {
                    this.jumpTo(0)
                }
            } > {
                'restart Game'
            } <
            /button>

            <
            /div>

            <
            /div>
        )
    }
}

function calculateWinner(squares) {

    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}