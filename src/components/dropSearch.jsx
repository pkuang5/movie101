import React, { Component } from 'react';

class DropSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {  
            text: '',
            items: [],
            date: '',
        }
    }
    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false)
    }
    handleClick = (e) => {
        if (this.node.contains(e.target)) {
            return;
        }
        this.handleClickOutside()
    }
    handleClickOutside = (e) => {
        this.setState({items:[]})
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
            date: year,
        })
        this.props.onChange2(title, year)
        this.props.getMovieInfo(title)
    }
    renderSuggestions = () => {
        if (this.state.items.length === 0) {
            return null;
        }
            return (
                <ul  class = "absolute border-4 border-grey-600 bg-gray-700 "> 
                    {this.state.items.map((item) => <li class = "hover:opacity-100 focus:shadow-outline  cursor-pointer"onClick = {()=>this.suggestionSelected(item.title, item.release_date)}>
                        <div  class={item.release_date ? "hover:opacity-100 focus:shadow-outline" : item.release_date = 'N/A' }>
                            <h6 class = "text-white">
                            {item.title} ({item.release_date.split('-')[0]})
                            </h6>
                        </div>
                    </li>)}
                </ul>
            )
    }
    render () {
        const {text} = this.state;
        return (
            <div ref = {node => this.node = node} class= "h-10 object-bottom ">
                <input id = "searchBar" class = "h-full rounded  cursor-pointer w-full " value = {text} onChange = {this.onTextChanged} type = "text"/>
                {this.renderSuggestions()}
            </div>
        )
    }
}
export default DropSearch;