import React, { Component } from 'react';

class Layout extends Component {

    render() {
        return (
          <div class="flex flex-col font-montserrat w-screen items-center mt-3">
            <div class = "w-2/3  items-center">
                <div class = "pt-8 grid grid-row-2 ">
                    <div class = "grid grid-cols-2 h-64 mb-12">
                        <div class = "w-full h-full bg-blue-800 pt-8 ">
                            <p>EDITOR</p>
                            <label>MOVIE SEARCH</label> <br/><input></input><br/><br/>
                            <textarea class = "pb-8 border border-black border-width-4 h-64 w-full">

                            </textarea>
                        </div>
                        <div class = "h-full bg-red-800 pt-8">
                            <div class = " ml-32 h-64 w-1/2 bg-yellow-400">
                            </div>
                            <label class = "pt-4 ml-40">REVIEW</label>
                        </div>
                    </div>
                    <div class = " h-full mt-24 bg-orange-400" >
                        {/* <div class = "h-64 w-full border border-blue-800 border-width-4 bg-red-400"> */}
                            <div class = "bg-blue-300 mt-24 h-auto">
                                movies images
                            </div>
                        {/* </div> */}
                        <button class = "text-sm border-2 border-gray-600 mt-8 py-2 px-4 w-1/2  h-12">submit</button>
                        <button class = "pl-40">featured</button>
                    </div>
                
                </div>
            </div>
        </div>
        );
    }
}
export default Layout;