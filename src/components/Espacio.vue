<template>
  <div class="container objects">
    <div class="section">
      <div id="visualCodeContainer" :class="(showImages)?'showImages':''">
          <div class="item">
            <youtube video-id="IuUxV1GzECc" player-width="990" player-height="557"></youtube>
            <div class="text">
                <p>Vacío difuso (registro)</p>
                <small>Registro de la instalación Vacío Difuso.</small><br>
                <small>Presentada como proyecto de graduación de la Lic. en Artes Multimediales, en la Universidad Nacional de las Artes el 20 de Diciembre de 2021</small><br>
                <small>2021</small><br><br>
                <p>
                    Vacío Difuso es una instalación audio-lumínica-generativa, que buscó generar una experiencia sensorial en un espacio inmersivo, y en donde se invitó al espectador a la escucha profunda y a la contemplación. A través de la creación de un sistema autónomo que involucró luces LED, arte generativo y música Drone/Ambient. 
                </p><br>
                <p>
                    Ante la sobrecarga de estímulos de un mundo frenético e hiperactivo. Vacío Difuso se propuso como una experiencia contemplativa de no-acción como respuesta ante un mundo mecanizado e industrial que es incapaz de detenerse. 
                    Es necesario crear estos espacios donde se estimule un ritmo diferente, aletargado, como resistencia a la inmediatez en las sociedades.
                </p><br>
                <p>
                    Con el uso de tecnología lumínica LED se crearon unas visuales generativas. Y el uso de música drone (sonido pedal de poca variación armónica y sostenido en el tiempo) y música ambient se propuso generar un ambiente que favorezca una experiencia sensorial contemplativa.
                </p><br>
                <a href="https://docs.google.com/document/d/1kFbto5aR8fjo3WycskMPM9HlTmlzoelu5atXx5FNeC8/edit?usp=sharing">Link a proyecto escrito completo</a>
            </div>
            
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Espacio",
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
