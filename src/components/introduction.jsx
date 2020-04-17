import React, { Component } from 'react';
import UpArrow from '../assets/svg/upArrow.svg'

class Introduction extends Component {
    state = {  }

    scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
    }

    render() {
        return (
            <React.Fragment>
            <div class="flex h-screen font-yeseva">
                <div class="lg:text-5xl md:text-3xl sm:text-xl pt-40 absolute">
                    <p class="ml-20">Keep track of the</p>
                    <p class="ml-64">movies you love.</p>
                </div>
                <div class="flex mr-20 ml-20">
                    <div class="flex-auto ml-32 w-2/5 z-10 mb-16 self-end">
                        <img src= "https://external.xx.fbcdn.net/safe_image.php?d=AQDkz4X-kZ0eawup&w=960&h=519&url=https%3A%2F%2Ffilm-grab.com%2Fwp-content%2Fuploads%2Fphoto-gallery%2FCastle_in_the_Sky_041.jpg%3Fbwg%3D1569400977&_nc_hash=AQAPuD1lKkqdNGLJ" alt="castle in the sky 2"/>
                    </div>
                    <div class="flex-auto w-3/5 -ml-40 mt-24">
                        <img src= "https://film-grab.com/wp-content/uploads/2019/11/Castle-in-the-Sky-010.jpg" alt="castle in the sky 1"/>
                        <p class="text-xl font-montserrat absolute self-end ml-56 mr-32 mt-8">Screenbook allows you to quiuckly add anything you've watched and create lists to organize films however you please.</p>
                    </div>
                </div>
            </div>
            <div class="flex w-full h-screen bg-local justify-between p-12 mb-20" style={{backgroundImage: "url('https://film-grab.com/wp-content/uploads/photo-gallery/49%20(442).jpg?bwg=1547220404')"}}>
                <div class="w-5/12 self-end text-white text-xl font-montserrat">
                    We have a database of movie stills so you can pick the most memorable scenes to describe those inexplicable feelings. Then, share it with the community. 
                </div>

                <div class="w-7/12 text-white text-5xl text-right font-yeseva">
                    Create journals to remember your favorite shots.
                </div>
            </div>
            <div class="flex w-full">
                <div class="inline-block w-2/3 text-right">
                    <div class="w-2/3 absolute mt-32 pr-4 font-yeseva text-4xl text-white">A personalized capsule for <br></br> made by</div>
                    <img src="https://film-grab.com/wp-content/uploads/photo-gallery/The_Handmaiden_062.jpg?bwg=1569841492" alt="the handmaiden 1" />
                </div>
                <div class="inline-block w-1/3">
                    <p class="mt-32 pl-2 font-yeseva text-4xl">film lovers. <br></br> film lovers. </p>
                </div>
            </div>
            <div class="flex w-full -mt-32 mb-24">
                <p class="text-xl w-1/3 font-montserrat pl-12 pt-48 pr-12">
                    See what the Screenbook community has to say. <br></br><br></br> Share your thoughts and opnions. <br></br><br></br> Explore journals and movies.
                </p>
                <div class="w-2/3">
                    <img src="https://film-grab.com/wp-content/uploads/photo-gallery/The_Handmaiden_042.jpg?bwg=1569841492" alt="the handmaiden 2" />
                </div>
            </div>
            <div class="flex w-full justify-center mb-16">
                <div class="rounded-full h-20 w-20 flex items-center justify-center button-color-beige cursor-pointer" onClick={this.scrollToTop}>
                    <img class="h-6" src={UpArrow} />
                </div>
            </div>
            </React.Fragment>
        );
    }
}

export default Introduction;