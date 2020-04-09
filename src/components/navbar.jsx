import React, { Component } from "react";
class Navbar extends Component {

  render() {
    const {isSignedIn} = this.props;
    return (
      <nav class="flex items-center justify-between flex-wrap p-6 font-serif">
        <div class="w-full block flex-grow flex items-end">
          <div class="text-base flex-grow">
            <span class="font-sans text-xl font-bold block inline-block mt-0 text-black hover:border-gray-200 mr-4 select-none">
              Screenbook
            </span>
            <a href="#responsive-header" class="font-sans block inline-block mt-0 text-black hover:border-gray-200 hover:text-gray-700 mr-4">
              Feed
            </a>
            <a href="#responsive-header" class="font-sans block inline-block mt-0 text-black hover:text-gray-700 mr-4">
              Explore
            </a>
            <a href="#responsive-header" class="font-sans block inline-block mt-0 text-black hover:text-gray-700">
              Search
            </a>
          </div>
          <div>
            <p class="font-sans text-black mt-0 mr-4 font-semibold">pkuang5</p>
          </div>
        </div>
      </nav>  
    );
  }
}

export default Navbar;
