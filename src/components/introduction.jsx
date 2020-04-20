import React, { Component } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import UpArrow from '../assets/svg/upArrow.svg'

AOS.init();

class Introduction extends Component {

    scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
    }


    render() {
        return (
            <React.Fragment>
                <div class="flex flex-col">
                    <div class="flex flex-row w-screen lg:text-5xl md:text-3xl sm:text-xl py-6 md:py-20 font-yeseva pt-8">
                        <div class="w-2/5" data-aos="fade-right">
                            <p class="text-right pr-2">Keep track of the<br></br>movies you</p>
                        </div>
                        <div class="w-3/5" data-aos="fade-left">
                            <div class="w-5/6">
                                <p class="absolute text-white pl-1"><br></br>love.</p>
                                <div class= "flex justify-end">
                                    <img src= "https://film-grab.com/wp-content/uploads/2019/11/Castle-in-the-Sky-010.jpg" alt="castle in the sky 1"></img>
                                    <p class="text-transparent lg:text-xs font-montserrat lg:text-white absolute self-end pr-2 pb-2">Castle in the Sky (1986) dir. Hayao Miyazaki</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex w-screeen pb-20 items-center font-yeseva">
                        <div class="flex w-1/2 justify-end" data-aos="fade-up">
                            <div class="w-4/5 flex">
                                <img src= "https://external.xx.fbcdn.net/safe_image.php?d=AQDkz4X-kZ0eawup&w=960&h=519&url=https%3A%2F%2Ffilm-grab.com%2Fwp-content%2Fuploads%2Fphoto-gallery%2FCastle_in_the_Sky_041.jpg%3Fbwg%3D1569400977&_nc_hash=AQAPuD1lKkqdNGLJ" alt="castle in the sky 2"/>
                            </div>
                        </div>
                        <div class="flex w-1/2" data-aos="fade-down">
                            <p class="w-5/6 lg:text-xl md:text-lg text-xs font-montserrat px-20">Screenbook allows you to quiuckly add anything you've watched and create lists to organize films however you please.</p>
                        </div>
                    </div>

                    <div class="flex w-screen justify-between">
                        <div class="flex w-full" data-aos="zoom-in"> 
                            <p class="absolute text-white w-full font-montserrat text-right text-xl self-end pr-6 pb-6">Her (2013) dir. Spike Jonze</p>
                            <img class="w-full" src="https://film-grab.com/wp-content/uploads/photo-gallery/49%20(442).jpg?bwg=1547220404" alt="her backdrop" />
                        </div>
                        <div class="flex w-full h-full absolute px-12 pt-10">
                            <div class="w-5/12 self-end text-white text-xl font-montserrat" data-aos="zoom-in">
                                We have a database of movie stills so you can pick the most memorable scenes to describe those inexplicable feelings. Then, share it with the community. 
                            </div>

                            <div class="w-7/12 text-white text-5xl text-right font-yeseva" data-aos="zoom-in">
                                Create journals to remember your favorite shots.
                            </div>
                        </div>
                    </div>
                
                    <div class="flex w-full mt-20" data-aos="fade-right">
                        <div class="flex w-2/3 justify-end">
                            <div class="flex w-5/6 justify-end text-right">
                                <div class="absolute mt-32 pr-2 font-yeseva text-4xl text-white">A personalized capsule for <br></br> made by</div>
                                <img src="https://film-grab.com/wp-content/uploads/photo-gallery/The_Handmaiden_062.jpg?bwg=1569841492" alt="the handmaiden 1" />
                            </div>
                        </div>
                        <div class="w-1/3">
                            <p class="mt-32 pl-2 font-yeseva text-4xl">film lovers. <br></br> film lovers. </p>
                        </div>
                    </div>

                    <div class="flex w-full mt-20" data-aos="fade-left">
                        <p class="flex text-xl w-1/3 font-montserrat px-12 items-center">
                            See what the Screenbook community has to say. <br></br><br></br> Share your thoughts and opnions. <br></br><br></br> Explore journals and movies.
                        </p>
                        <div class="w-2/3">
                            <img class="w-5/6" src="https://film-grab.com/wp-content/uploads/photo-gallery/The_Handmaiden_042.jpg?bwg=1569841492" alt="the handmaiden 2" />
                        </div>
                    </div>

                    <div class="flex w-full justify-center mt-20 mb-16" data-aos="zoom-in-up">
                        <div class="rounded-full h-20 w-20 flex items-center justify-center button-color-beige cursor-pointer" onClick={this.scrollToTop}>
                            <img class="h-6" src={UpArrow} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Introduction;