import { gsap } from "gsap";

let  mouseMove/*, blurredBackground*/;

//let openTitleTimeline;

let backgroundAnimation, falseBackgroundAnimation;
//let blurBackground;

let _this, isMobile;

export const Animations = {
    init: (__this) => {
        _this = __this;
        if (_this.$isMobile()) isMobile = true;
        else isMobile = false;
        if (!isMobile) {
            mouseMove = document.querySelector('.mouseMove');
        }
        //blurredBackground = document.getElementById("blurredBackground");
        createTimelines();
       // open();

    },
    backgroundAnimation: () => {

        backgroundAnimation.play();
        falseBackgroundAnimation.play();

    },
    stopBackgroundAnimation:()=> {
        backgroundAnimation.pause();
        falseBackgroundAnimation.pause();
    },
    _animMouseMove: () => {
        window.addEventListener("mousemove", animMouseMove);
    },
   /* openBlur: () => {
        openBlur();
    },
    closeBlur: () => {
        closeBlur();
    },*/
}

function createTimelines() {
    backgroundAnimation = gsap.timeline({ paused: true });
    if (isMobile) backgroundAnimation.to(".background", 10, { backgroundImage: "linear-gradient(to bottom, #2b0e13, #2b0e20, #410d31, #410d31, #4f0e48,#4f0e48)", repeat: -1, yoyo: true, repeatDelay: 0.2 });
    else backgroundAnimation.to(".background", 10, { backgroundImage: "linear-gradient(to left, #2b0e13, #2b0e20, #410d31, #410d31, #4f0e48,#4f0e48)", repeat: -1, yoyo: true, repeatDelay: 0.2 });
    falseBackgroundAnimation = gsap.timeline({ paused: true });
    if (isMobile) falseBackgroundAnimation.to(".false-background", 12, { backgroundImage: "linear-gradient(to bottom, #1b260c, #1d300d, #4e3f0e, #4f460e, #4f4c0f,#4f4c0f)", repeat: -1, yoyo: true, repeatDelay: 0.2 });
    else falseBackgroundAnimation.to(".false-background", 12, { backgroundImage: "linear-gradient(to right, #1b260c, #1d300d, #4e3f0e, #4f460e, #4f4c0f,#4f4c0f)", repeat: -1, yoyo: true, repeatDelay: 0.2 });

    // text reveal
    /*openTitleTimeline = gsap.timeline({ delay: 1, paused: true, defaults: { ease: 'power1.out' } });
    openTitleTimeline
        .addLabel('intro')
        .from(".spanLeft", 2, { clipPath: 'inset(0px 0px 0px 100%)' })
        .from(".spanRight", 2, { clipPath: 'inset(0px 100% 0px 0px)' }, 'intro')
        .addLabel('move')
        .to(".spanLeft", 1, { y: -6 })
        .to(".spanRight", 1, { y: 6 }, 'move');*/

   // blurBackground = gsap.timeline({ paused: true });
   // blurBackground.fromTo(blurredBackground, 0.2, { autoAlpha: 0, className: 'noblur' }, { autoAlpha: 1, className: "blur", ease: "power1,out" })
}

/* mouse move*/
function animMouseMove(e) {
    gsap.to(mouseMove, 0.2, { x: (e.x - mouseMove.offsetWidth / 2), y: (e.y - mouseMove.offsetHeight / 2) })
}
/* open title*/ /*
function open() {
    openTitleTimeline.timeScale(1).play();
}*//*
function openBlur(){
    blurBackground.timeScale(1).play();
}
function closeBlur(){
    blurBackground.timeScale(1).reverse();
}*/