<template>
  <div id="app">
    <div class="mouseMove">scroll</div>
    <router-view></router-view>
    <nav id="menuSection">
      <div>
        <router-link event to="/" @click.native.prevent="handleOpenModal('/')">/</router-link>
      </div>
      <div>
        <a href="https://www.fxhash.xyz/u/mdollinger" target="_blank">Gen-Art</a>
      </div>
      <div>
        <router-link event to="/gradientes" @click.native.prevent="handleOpenModal('/Gradientes')">Gradientes</router-link>
      </div>
      <div>
        <router-link event to="/objetos" @click.native.prevent="handleOpenModal('/objetos')">Objetos</router-link>
      </div>
      <div>
        <router-link event to="/audio" @click.native.prevent="handleOpenModal('/Audio')">Audio</router-link>
      </div>
      <div>
        <router-link event to="/espacio" @click.native.prevent="handleOpenModal('/espacio')">Vacío Difuso</router-link>
      </div>
        <!--
      <div>
        <router-link event to="/visualcode" @click.native.prevent="handleOpenModal('/Visualcode')">Visual Code</router-link>
      </div>
    
      <div>
        <router-link to="/txt">Txt</router-link>
      </div>-->
    </nav>
    
    <!--
    <div id="modalNav">
      <div>
        <p>Está accion detendrá el audio</p>
        <button @click="handleCancel">cancelar</button>
        <button @click="handleContinue">continuar</button>
        <button @click="handleOpenNewWindow">abrir en nueva ventana</button>
      </div>      
    </div>-->
    <div class="background"></div>
    <div class="false-background"></div>
    <div id="blurredBackground"></div>
  </div>
</template>

<script>
// SCSS Imports
import "./assets/scss/main.scss";

// JS Imports
import "./assets/js/main.js";
import { Animations } from "./assets/js/main.js";


export default {
  name: "App",
  mounted() {
    Animations.init(this);
    Animations.backgroundAnimation();
    if (!this.$isMobile()) Animations._animMouseMove();
  },
  data() {
    return {
    };
  },
  methods: {
    handleOpenModal(route){
      this.$router.push(route);
    },
  },
  components: {
  },
  metaInfo() {
        return { 
            title: "Mauro Dollinger - Espacio estelar",
            meta: [
                { name: 'description', content:  'Mauro Dollinger, artista, músico y programador. Buenos Aires, Argentina.'},
                { property: 'og:title', content: "Mauro Dollinger, artista, músico y programador. Buenos Aires, Argentina."},
                { property: 'og:site_name', content: 'Mauro Dollinger'},
                {property: 'og:type', content: 'website'},    
                {name: 'robots', content: 'index,follow'} 
            ]
        }
    }
};
</script>

