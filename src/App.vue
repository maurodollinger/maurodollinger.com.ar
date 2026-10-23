<template>
  <div id="app">
    <router-view v-slot="{ Component, route }">
      <Transition
        :css="false"
        mode="out-in"
        @enter="onEnter"
        @leave="onLeave"
      >
        <component :is="Component" :key="route.path" />
      </Transition>
    </router-view>
    <div class="background"></div>
    <div class="false-background"></div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import "./assets/scss/main.scss";
import { Animations } from "./assets/js/animations.js";

export default {
  name: "App",
  mounted() {
    Animations.init(this);
    Animations.backgroundAnimation();
  },
  methods: {
    handleOpenModal(route){
      this.$router.push(route);
    },
    onEnter(el, done) {
       gsap.fromTo(
        el,
        {
          opacity: 0,
          filter: "blur(12px)",
          xPercent: 0,
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.45,
          ease: "power2.out",
          onComplete: done,
        }
      );
    },
    onLeave(el, done) {
      gsap.timeline({
      onComplete: done,
    })
      .to(el, {
        filter: "blur(8px)",
        duration: 0.18,
        ease: "linear",
      })
      .to(el, {
        opacity: 0,
        filter: "blur(12px)",
        duration: 0.35,
        ease: "power2.in",
      }, 0.05);
    },
  }, 
  metaInfo() {
        return { 
            title: "Mauro Dollinger - Web Porfolio",
            meta: [
                { name: 'description', content:  'Mauro Dollinger, artista, programador. Buenos Aires, Argentina.'},
                { property: 'og:title', content: "Mauro Dollinger, artista, programador. Buenos Aires, Argentina."},
                { property: 'og:site_name', content: 'Mauro Dollinger'},
                {property: 'og:type', content: 'website'},    
                {name: 'robots', content: 'index,follow'} 
            ]
        }
    }
};
</script>

