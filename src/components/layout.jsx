import React, { Component} from 'react';
// A TESTING COMPONENT FOR EDITOR UI

class Layout extends Component {
    
      onChange = (date) => {
          //console.log(date.split(" "))
          this.setState({date})
          console.log(date)
      }
      onClickDay = (day) => {
        this.setState({day: day})
        console.log(day)
      }
    render () {
        return (
            <div class="grid grid-cols-2 gap-4">
                {/* left half */}
                <div class = " h-16 bg-red-800 pt-8">
                    <p class="font-serif text-3xl font-bold ">Editor</p>
                    <p class="font-serif  font-bold pb-4">Fill in the information, search, and submit!</p>
                    <div class = "pt-2 grid grid-cols-3 gap-2 border-8 border-yellow-600 ">  
                        <div >
                            <p>Title</p>
                            <input class = "border-8 border-red-400"></input>
                        </div>
                        <div>
                            <p>Date</p>
                            <input class = "border-8 border-red-400 w-1/2"></input>
                        </div>
                        <div>
                            <p>Search</p>
                            <button class = "border-8 border-red-400 w-1/2">SEARCH</button>
                        </div>
                    </div>
                    <div class = "pt-8 border border-8 border-color-green-800 w-full h-48 pb-4 ">
                        <p>Review</p>
                        <input class = "border-8 border-red-400 w-full h-full"></input>
                    </div>
                    <div class = "pt-8 border-8 border-blue-400 h-48">
                    <div class = "pt-2 grid grid-cols-3 gap-2 border-8 border-yellow-600 "> 
                        <div>
                            <p>Rate</p>
                            <select>
                                <option>5</option>
                                <option>4</option>
                            </select>
                        </div>
                        <div>
                            <p class ="pl-4">Submit</p>
                            <button class = "border-8 border-red-400 w-1/2">Submit</button>
                        </div>
                        <div>
                            <p>Publish in Featured</p>
                            <select>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </div>
                    </div>
                    </div>
                </div>
                {/* right half */}
                <div class = " h-16 bg-red-800 pt-8">
                    <div class = "pt-16 grid-rows-2 ">
                        <div class = "border-8 border-blue-800 pt-8 pb-8 h-64">
                            <p>Which movie would you like?</p>
                        </div>
                        <div class = "border-8 border-green-800 pt-8 pb-8 h-64"> 
                            <p>Specific movie images</p>
                        </div>
                    </div>
                </div>
            
            </div>
        )
    }
}
export default Layout