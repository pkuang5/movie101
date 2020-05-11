import React, { Component } from 'react';

class Text extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            suggestions: [],
            text: '',
            items: []
        }
    }
    getMovieInfo = (value) => {
        console.log(value)
        
        this.setState({items: []})
        let url = ''.concat('https://api.themoviedb.org/3/', 'search/movie?api_key=', process.env.REACT_APP_MOVIEDB_API_KEY, '&query=', value);
        fetch(url).then(result=>result.json()).then((data)=>{
                console.log('in getmovie')
                var i
                var title
                for (i in data.results) {
                    title =  data.results[i].title
                    this.state.items.push(title)
                  }
                  console.log (this.state.items)
        })
    }
    onTextChanged = (e) => {

        var value = e.target.value;
        let suggestions = []
        if (value.length > 0) {
            console.log('about to get movie')
            this.getMovieInfo(value)
            const regex = new RegExp(`^${value}`, 'i')
            suggestions = this.state.items.sort().filter(v=>regex.test(v))
            console.log(this.state.items)
            console.log(suggestions)
            
        }
        this.setState({
            suggestions: suggestions,
            text: value
        })
        
    }
    suggestionSelected (value) {
        this.setState({
            text:value,
            suggestions: []
        })
    }
    renderSuggestions () {
        if (this.state.suggestions.length === 0) {
            return null;
        }
            return (
                <ul>
                    {this.state.suggestions.map((item) => <li class = "hover:opacity-100 focus:shadow-outline  cursor-pointer"onClick = {()=>this.suggestionSelected(item)}>{item}</li>)}
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