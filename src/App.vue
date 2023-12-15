<template>
  <div id="app">
    <router-view></router-view>
    <div class="background"></div>
    <div class="false-background"></div>
  </div>
</template>

<script>
import "./assets/scss/main.scss";
import { Animations } from "./assets/js/animations.js";

export default {
  name: "App",
  mounted() {
    Animations.init(this);
   // Animations.backgroundAnimation();
  },
  methods: {
    handleOpenModal(route){
      this.$router.push(route);
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

