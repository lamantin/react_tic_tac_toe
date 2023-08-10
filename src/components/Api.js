import React, { Component } from 'react'
import axios from "axios";


const apiURL = "http://168.119.60.143:5000/";
const saveBoardUrl = apiURL + 'boards';
export const listBoardUrl = 'http://168.119.60.143:5000/boards';
export default class Api extends Component {
    constructor(props) {
    	super(props);
    	this.state = {
            items: [],
            DataisLoaded: false
        };
        
    }
    saveBoard(board, name) {
        axios.post(saveBoardUrl, {
                board: board,
                name: name
            })
            .then(function(response) {
                alert(response.statusText);
            }).catch(error => {
     alert(error.response.data.error)
  })

    }


    getBoardById(id) {
    	fetch(
               listBoardUrl+'/'+id)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })
    }
       
}