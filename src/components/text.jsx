import React, { Component } from 'react';

class Text extends Component {
    constructor(props) {
        super(props)
        this.state = {  
            text: '',
            items: [],
            date: ''
        }
    }
    onTextChanged = (e) => {
        var value = e.target.value;
        if (value.length > 0) {
            this.setState({items: []})
            let url = ''.concat('https://api.themoviedb.org/3/', 'search/movie?api_key=', process.env.REACT_APP_MOVIEDB_API_KEY, '&query=', value);
            fetch(url).then(result=>result.json()).then((data)=>{
                  this.setState({
                    items: data.results,  
                })
             })
             this.setState({text: value})
             this.props.onChange(e)
        }
        else {
            this.setState({
                items: [],
                text: ''
            })
        }
    }
    suggestionSelected (title, year) {
        this.setState({
            text:title,
            items: [],
            date: year
        })
        this.props.onChange2(title, year)
    }
    renderSuggestions = () => {
        if (this.state.items.length === 0) {
            return null;
        }
            return (
                <ul>
                    {this.state.items.map((item) => <li class = "hover:opacity-100 focus:shadow-outline  cursor-pointer"onClick = {()=>this.suggestionSelected(item.title, item.release_date)}>
                     {item.title}
                        </li>)}
                </ul>
            )
    }
    render () {
        const {text} = this.state;
        return (
            <div class = "  border-4 border-grey-800  ">
                <input class = " border-grey-800  cursor-pointer w-full " value = {text} onChange = {this.onTextChanged} type = "text"/>
                {this.renderSuggestions()}
            </div>
        )
    }
}
export default Text;