import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import UpArrow from '../assets/svg/upArrow.svg'

AOS.init();

function Introduction(props) {

    const backgroundImage = "https://film-grab.com/wp-content/uploads/photo-gallery/49%20(442).jpg?bwg=1547220404"

    function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
    }

    return (
        <div class="flex flex-col w-full">
            <div class="flex lg:text-5xl md:text-3xl sm:text-lg text-sm py-20 font-yeseva">
                <div class="flex w-2/5 justify-end pt-3" data-aos="fade-up">
                    <p class="text-right px-2">Keep track of the<br></br>movies you</p>
                </div>
                <div class="w-3/5" data-aos="fade-down">
                    <p class="absolute text-white pl-1 pt-3"><br></br>love.</p>
                    <div class="w-4/5">
                        <img src= "https://film-grab.com/wp-content/uploads/2019/11/Castle-in-the-Sky-010.jpg" alt="castle in the sky 1"></img>
                        {/* <p class="font-montserrat text-black absolute pr-2 pb-2 text-xl">Castle in the Sky (1986) dir. Hayao Miyazaki</p> */}
                    </div>
                </div>
            </div>
            <div class="flex font-yeseva items-center pb-20">
                <div class="w-1/2" data-aos="fade-up">
                    <img class="w-4/5 float-right" src= "https://external.xx.fbcdn.net/safe_image.php?d=AQDkz4X-kZ0eawup&w=960&h=519&url=https%3A%2F%2Ffilm-grab.com%2Fwp-content%2Fuploads%2Fphoto-gallery%2FCastle_in_the_Sky_041.jpg%3Fbwg%3D1569400977&_nc_hash=AQAPuD1lKkqdNGLJ" alt="castle in the sky 2"/>
                </div>
                <div class="flex w-1/2 justify-start" data-aos="fade-down">
                    <p class="w-5/6 lg:text-xl md:text-lg text-xs font-montserrat pl-4">Screenbook allows you to quiuckly add anything you've watched and create lists to organize films however you please.</p>
                </div>
            </div>

            <div class="flex flex-col justify-between w-full h-screen bg-cover bg-local bg-center px-12 py-10" data-aos="zoom-in" style={{backgroundImage: "url('" + backgroundImage + "')"}}>
                <div class="flex w-full justify-end">
                    <p class="text-xl sm:text-2xl md:text-4xl lg:text-5xl text-right font-yeseva text-white"> Create journals to remember<br></br> your favorite shots.</p>
                </div>
                <div class="flex w-full justify-between text-white font-montserrat text-xs sm:text-sm md:text-md lg:text-xl">
                    <p class="w-5/12">We have a database of movie stills so you can pick the most memorable scenes to describe those inexplicable feelings. Then, share it with the community. </p>
                    <p class="w-7/12 text-right self-end text-xs">Her (2013) dir. Spike Jonze</p>
                </div>
            </div>
            <div class="flex lg:text-4xl md:text-2xl sm:text-lg text-xs py-20 font-yeseva">
                <div class="flex justify-end w-4/5 text-right" data-aos="fade-down">
                    <p class="absolute float-right pr-1 font-yeseva text-white"><br></br>A personalized capsule for <br></br> made by</p>
                    <div class="float-right w-5/6">
                        <img src= "https://film-grab.com/wp-content/uploads/photo-gallery/The_Handmaiden_062.jpg?bwg=1569841492" alt="handmaiden 1"></img>
                    </div>
                </div>
                <div class="flex w-1/5 justify-start" data-aos="fade-up">
                    <p class="pl-1 font-yeseva"><br></br>film lovers. <br></br> film lovers. </p>
                </div>
            </div>
            <div class="flex w-full">
                <div class="flex justify-end items-center lg:text-lg sm:text-md text-xs w-1/2 font-montserrat"  data-aos="fade-up">
                    <div class="w-4/5 lg:text-lg md:text-md sm:text-sm text-xs" >
                        See what the Screenbook community has to say. Share your thoughts and opnions. Explore journals and movies.
                    </div>
                </div>
                <div class="w-1/2"  data-aos="fade-down">
                    <img class="w-5/6" src="https://film-grab.com/wp-content/uploads/photo-gallery/The_Handmaiden_042.jpg?bwg=1569841492" alt="the handmaiden 2" />
                </div>
            </div>

            <div class="flex w-full justify-center my-16" data-aos="zoom-in-up">
                <div class="rounded-full h-20 w-20 flex items-center justify-center button-color-beige cursor-pointer" onClick={scrollToTop}>
                    <img class="h-6" src={UpArrow} />
                </div>
            </div>
        </div>
    );
}

export default Introduction;