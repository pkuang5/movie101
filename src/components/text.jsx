import React, { Component } from 'react';

class Text extends Component {
    constructor(props) {
        super(props)

        this.state = {  
            text: '',
            items: []
        }
    }
    onTextChanged = (e) => {

        var value = e.target.value;
        
        if (value.length > 0) {
            this.setState({items: []})
            let url = ''.concat('https://api.themoviedb.org/3/', 'search/movie?api_key=', process.env.REACT_APP_MOVIEDB_API_KEY, '&query=', value);
            fetch(url).then(result=>result.json()).then((data)=>{
                var i
                var title
                for (i in data.results) {
                    title =  data.results[i].title
                    this.state.items.push(title)
                  }
                  this.setState({
                    
                    text: value
                })
             })
        }
        else {
            this.setState({
                items: [],
                text: ''
            })
        }
      
    }
    suggestionSelected (value) {
        this.setState({
            text:value,
            items: []
        })
    }
    renderSuggestions = () => {
        if (this.state.items.length === 0) {
            return null;
        }
            return (
                <ul>
                    {this.state.items.map((item) => <li class = "hover:opacity-100 focus:shadow-outline  cursor-pointer"onClick = {()=>this.suggestionSelected(item)}>{item}</li>)}
                </ul>
            )
        
    }
    render () {
        const {text} = this.state;
        return (
            <div class = "  border-4 border-grey-800 w-1/3 ">
                <input class = " border-grey-800  cursor-pointer w-full " value = {text} onChange = {this.onTextChanged} type = "text"/>
                {this.renderSuggestions()}
            </div>
        )
    }
}
export default Text;