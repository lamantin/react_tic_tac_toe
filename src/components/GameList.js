import React, {
    Component
} from 'react'
import Api, {
    saveBoard,
    getBoardList,
    listBoardUrl
} from './Api';
import Board from './Board';
import Game,{loadboard} from './Game';

export default class GameList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            DataisLoaded: false
        };
    }
    handleButton = (itemid) => {
     let dataSet =   new Game().loadboard(itemid);

    }
    componentDidMount() {
        fetch(
               listBoardUrl)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })
    }
    render() {
        const {
            DataisLoaded,
            items
        } = this.state;
        if (!DataisLoaded) return < div >
            <
            h1 > Pleses wait some time.... < /h1> </div > ;

        return ( <
                div className = "App" >
                <
                h1 > Boards < /h1>  {
                items.map((item) => ( <
                    ol key = {
                        item.id
                    } >
                    <
                    button onClick = {
                        this.handleButton.bind(this, item.id)
                    } > {
                        item.name
                    } < /button> <
                    /ol>
                ))
            } <
            /div>
    );
}
}