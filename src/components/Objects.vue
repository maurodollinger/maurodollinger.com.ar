<template>
  <div class="container objects">
    <div class="section">
      <div id="visualCodeContainer" :class="(showImages)?'showImages':''">
          <div class="item">
              <youtube video-id="lKxLpnJvTOs" player-width="990" player-height="557"></youtube>
              <p>Aural. (möbius)</p>
                <small>Matriz de luces pixel led. Reactiva al sonido.</small><br>
                <small>Programación en Processing, GL-Shader, Arduino.</small><br>
                <small>2021</small>
          </div>
          <div class="item">
              <youtube video-id="wJ7nUsGo8" player-width="990" player-height="557"></youtube>
              <p>Aural. (aether)</p>
                <small>Matriz de luces pixel led. Reactiva al sonido.</small><br>
                <small>Programación en Processing, GL-Shader, Arduino.</small><br>
                <small>2021</small>
          </div><!--
          <div class="item">
              <youtube video-id="8yN5cCPMVgo" player-width="990" player-height="557"></youtube>
              <p>Recorrido espectral con luces (prototipo)</p>
                <small>Matriz de luces pixel led. Reactiva al sonido.</small><br>
                <small>Programación en Processing,Arduino.</small><br>
                <small>2020</small>
          </div>
          <div class="item">
              <youtube video-id="ah1nO1tevG8" player-width="990" player-height="557"></youtube>
              <p>Aural (prototipo)</p>
          </div>-->
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Objects",
  data(){
    return{
      showImages:false
    }
  },
  methods: {
  },
  mounted(){
    this.showImages= true;
  }
};
</script>
