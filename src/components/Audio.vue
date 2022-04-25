<template>
  <div class="container audio">
    <div class="section">
      <div id="audioSection">

        <div id="audioItemContainer" >
          <div class="disc">
            <div class="discInfo">
              <h1>Vacío Difuso (mezcla)</h1>
              <h2>2021</h2>
              <p>Registro de la instalación Vacío Difuso. Presentada como proyecto de graduación de la Lic. en Artes Multimediales, en la Universidad Nacional de las Artes el 20 de Diciembre de 2021</p>              
              <p>3 pistas - 20 minutos</p>
              <h3>Escuchar en <a href="https://soundcloud.com/sonocorporeo/sets/vacio-difuso-mezcla" target="_blank">Soundcloud</a></h3>
            </div>
          </div>
          <div class="cover">
            <img src="@/assets/img/audios/vacio.jpg" alt="vacio">
          </div>

          <div class="disc">
            <div class="discInfo">
              <h1>Hiperobjectos</h1>
              <h2>2021</h2>
              <p>Hiperobjectos es un album de piezas sonoras abstractas y experimentales.<br>Las composiciones surgen mediante la exploración y la práctica del Deep Listening o meditación sónica, el ambient y la experimentación.</p>              
              <p>14 pistas - 42 minutos</p>
              <h3>Escuchar en <a href="https://soundcloud.com/sonocorporeo/sets/hiperobjetos" target="_blank">Soundcloud</a></h3>
            </div>
          </div>
          <div class="cover">
            <img src="@/assets/img/audios/hyperobjects2.jpg" alt="hyperobjets">
          </div>

          
          <div class="disc">
            <div class="discInfo">
              <h1>Æthēr / Möbius</h1>
              <h2>2020</h2>
              <p>EP</p>
              <p>2 pistas - 10 minutos</p>              
              <h3>Escuchar en <a href="https://soundcloud.com/sonocorporeo/sets/aethe-r" target="_blank">Soundcloud</a></h3>
            </div>
          </div>
          

          <div class="cover">
            <img src="@/assets/img/audios/aether.jpg" alt="aether">
          </div>

          <div class="disc">
            <div class="discInfo">
              <h1>Sonido estelar</h1>
              <h2>2019</h2>
              <p>Mezcla utilizada en la exposición de Sonido estelar.</p>
              <p>Duración: 23 minutos</p>
              <p>WIP 2019</p>
              <p><small>Club Cultural Matienzo.</small></p>
              <p><small>Buenos Aires, Argentina.</small></p>
              <h3>Escuchar en <a href="https://soundcloud.com/sonocorporeo/sets/sonido-estelar-mezcla" target="_blank">Soundcloud</a></h3>
            </div>
            
          </div>
          <div class="cover">
            <SoundCloud
            track="1099461310"
            @ready="ready"
            />
          </div>
          
          <div class="disc">
            <div class="discInfo">
              <h1>Éxodo / Ápex</h1>
              <h2>2019</h2>      
              <p>EP</p>         
              <p>2 pistas - 20 minutos</p>  
              <h3>Escuchar en <a href="https://soundcloud.com/sonocorporeo/sets/exodo-apex" target="_blank">Soundcloud</a></h3>
            </div>
          </div>
          <div class="cover">
            <img src="@/assets/img/audios/exodo2.jpg" alt="exodo">
          </div>
        </div>       
      </div>
    </div>
  </div>
</template>

<script>

//var iframes;
//var players;
import SoundCloud from 'vue-soundcloud-player';

export default {
  name: "Audio",
  data() {
    return {
    };
  },
  methods:{
  },
  components: {
    SoundCloud
  }
};
</script>
