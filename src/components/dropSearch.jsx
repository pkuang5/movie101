import React, { Component } from 'react';

class DropSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: null,
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
        this.setState({ items: [] })
    }
    onTextChanged = (e) => {
        var value = e.target.value;
        if (value[0] !== ' ' && value.length > 0) {
            this.setState({ items: [] })
            let url = ''.concat('https://api.themoviedb.org/3/', 'search/movie?api_key=', process.env.REACT_APP_MOVIEDB_API_KEY, '&query=', value);
            fetch(url).then(result => result.json()).then((data) => {
                this.setState({
                    items: data.results,
                })
            })
            this.setState({ text: value })
            this.props.onChange(e)
        }

        else {
            this.setState({
                items: [],
                text: ''
            })
        }
    }
    suggestionSelected = (title, year, id) => {
        this.setState({
            text: title,
            items: [],
            date: year,
        })
        this.props.onChange2(title, year)
        this.props.getMovieInfo(title, id)
    }
  
    render() {
        return (
            <div ref={node => this.node = node} class="h-10 w-full">
                <input autocomplete="off" id="searchBar" class="outline-none h-full rounded sm:text-md text-xs cursor-pointer w-full " value={this.state.text} onChange={this.onTextChanged}
                    onKeyPress={event => {
                        if (event.key === 'Enter') {
                            console.log(this.state.text)
                            this.props.getMovieInfo(this.state.text)
                        }
                    }}
                    type="text" placeholder={this.props.name && (this.state.text === null) ? this.props.name : "Search for a movie to add!"} />
                {this.state.items.length === 0 ? null:
                <ul class="overflow-scroll h-64 bg-gray-100 w-full">
                    {this.state.items.map((item) => <li onClick={() => this.suggestionSelected(item.title, item.release_date, item.id)}>
                        <div class={item.release_date ? "hover:bg-gray-300 cursor-pointer" : item.release_date = '-'}>
                            <div class=" self-center h-24 flex ">
                                <img class="h-24 w-16" src={item.poster_path !== null ? 'https://image.tmdb.org/t/p/w500' + item.poster_path : "http://pngimg.com/uploads/mario/mario_PNG53.png"} />
                                <div class="flex flex-col pl-4 ">
                                    <p class="sm:text-md text-xs font-semibold text-black">{item.title}</p>
                                    <p class="text-xs text-black">{(item.release_date.split('-')[0])}</p>
                                </div>
                            </div>
                        </div>
                        <br />
                    </li>)}
                </ul>}
            </div>
        )
    }
}
export default DropSearch;