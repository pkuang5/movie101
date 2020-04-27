import React, { Component } from 'react';

class Profile extends Component {
    state = { 
        username: 'pkuang',
        profilePicUrl: 'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/73714020_434465267246297_8758241746011291648_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=kMkRJd7b9ckAX_xG870&oh=691d19c0d078570edc3dd94409b2f03b&oe=5ECF02E0',
        bio: "on a quest to find perpetual energy"
    }

    render() {
        return (
            <div class="flex flex-col w-screen items-center">
                <div class="flex flex-col w-1/3 items-center pt-6">
                    <div class="rounded-full h-32 w-32 flex bg-cover" style={{backgroundImage: "url('" + this.state.profilePicUrl + "')"}}> </div>
                    <p class="text-xl font-montserrat mt-2">{this.state.username}</p>
                    <p class="text-xs font-montserrat mt-1">{this.state.bio}</p>
                </div>
                <div class="flex w-3/5 justify-between mt-12">
                    <button class="text-lg font-montserrat">Featured</button>
                    <button class="text-lg font-montserrat">Journals</button>
                    <button class="text-lg font-montserrat">Lists</button>
                </div>
            </div>
        );
    }
}

export default Profile;