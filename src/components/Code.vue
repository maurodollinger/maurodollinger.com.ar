<template>
  <div class="container code">
    <div class="section">
      <div id="visualCodeContainer" :class="(showImages)?'showImages':''">
          <div class="item">
              <youtube video-id="WfpSivJZSHE" player-width="600" player-height="600"></youtube>

              <!--
              <video width="600" height="600" controls controlsList="nodownload">
                  <source src="@/assets/video/pause.mp4" type="video/mp4" >
              </video>-->
              <p>Pause</p>
                <small>Programación en gl-shader y Processing</small><br>
                <small>Audio track #8 de Hiperobjectos</small><br>
                <small>2021</small>
          </div>
          <div class="item">
             <youtube video-id="AdALxBFlLbo" player-width="900" player-height="507"></youtube>
              <!--<video width="720" height="404" controls controlsList="nodownload" preload="none">
                  <source src="@/assets/video/caladan.mp4" type="video/mp4" >
              </video>-->
              <p>Caladan</p>
                <small>Programación en gl-shader y Processing</small><br>
                <small>Audio track #1 de Hiperobjectos</small><br>
                <small>2021</small>
          </div>
          <div class="item">
            <youtube video-id="fSOK8kqLO-c" player-width="400" player-height="600"></youtube>
              <!--<video width="400" height="600" controls controlsList="nodownload" preload="none">
                  <source src="@/assets/video/aether.mp4" type="video/mp4" >
              </video>-->
              <p>Φαίνων</p>
                <small>Programación en Processing</small><br>
                <small>Audio track Mobius</small><br>
                <small>2020</small>
          </div>
          <div class="item">
            <youtube video-id="zeB6QT_IHAE" player-width="600" player-height="600"></youtube>
              <!--<<video width="600" height="600" controls controlsList="nodownload" preload="none">
                  <source src="@/assets/video/capsula.mp4" type="video/mp4" >
              </video>-->
              <p>Cápsula</p>
                <small>Programación en Processing</small><br>
                <small>Música original</small><br>
                <small>2020</small>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Code",
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
