import { gsap } from "gsap";

let  mouseMove;

let backgroundAnimation;
let _this, isMobile;

export const Animations = {
    init: (__this) => {
        _this = __this;
        if (_this.$isMobile()) isMobile = true;
        else isMobile = false;
        if (!isMobile) {
            mouseMove = document.querySelector('.mouseMove');
        }
        createTimelines();

    },
    backgroundAnimation: () => {
        backgroundAnimation.play();
    },
    stopBackgroundAnimation:()=> {
        backgroundAnimation.pause();
    },
    _animMouseMove: () => {
        window.addEventListener("mousemove", animMouseMove);
    },
}

function createTimelines() {
    backgroundAnimation = gsap.timeline({ paused: true });

    backgroundAnimation.to(".background", 
    { backgroundImage: 'linear-gradient(to bottom, #2b0e13, #2b0e20, #410d31, #410d31, #4f0e48,#4f0e48)',
     repeat: -1, yoyo: true, repeatDelay: 0.2, duration:15 });

}

/* mouse move*/
function animMouseMove(e) {
    gsap.to(mouseMove, { x: (e.x - mouseMove.offsetWidth / 2), y: (e.y - mouseMove.offsetHeight / 2) ,duration:0.2})
}