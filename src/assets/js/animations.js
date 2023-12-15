import { gsap } from "gsap";

let backgroundAnimation;
let _this, isMobile;

export const Animations = {
    init: (__this) => {
        _this = __this;
        if (_this.$isMobile()) isMobile = true;
        else isMobile = false;
        createTimelines();

    },
    backgroundAnimation: () => {
        backgroundAnimation.play();
    },
    stopBackgroundAnimation:()=> {
        backgroundAnimation.pause();
    },
}

function createTimelines() {
    backgroundAnimation = gsap.timeline({ paused: true });

    backgroundAnimation.to(".background", 
    { backgroundImage: 'linear-gradient(to bottom, #2b0e13, #2b0e20, #410d31, #410d31, #4f0e48,#4f0e48)',
     repeat: -1, yoyo: true, repeatDelay: 0.2, duration:15 });

}

