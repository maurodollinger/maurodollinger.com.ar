<template>
  <div class="container visual">
    <div class="section">
      <div id="visualContainer" :class="(showImages)?'showImages':''">
        <div class="itemVisual">
          <img  src="@/assets/img/visual/DSC_1558.jpg" alt="gradiente" @load="imgLoadedMethod">
          <p>Silencio luminoso</p>
          <small>30x40</small><br>
          <small>Luz led fotografiada</small>
        </div>
        <div class="itemVisual">
          <img src="@/assets/img/visual/DSC_1562.jpg" alt="gradiente" @load="imgLoadedMethod">
          <p>Índigo Azul</p>
          <small>30x40</small><br>
          <small>Luz led fotografiada</small>
        </div>
        <div class="itemVisual">
          <img src="@/assets/img/visual/DSC_1622b.jpg" alt="gradiente" @load="imgLoadedMethod">
          <p>Tres colores sobre el cielo</p>
          <small>30x40</small><br>
          <small>Luz led fotografiada</small>
        </div>
        <div class="itemVisual">
          <img src="@/assets/img/visual/DSC_1544.jpg" alt="gradiente" @load="imgLoadedMethod">
          <p>Sin título</p>
          <small>30x40</small><br>
          <small>Luz led fotografiada</small>
        </div>
        <div class="itemVisual">
          <img src="@/assets/img/visual/DSC_1344c.jpg" alt="gradiente" @load="imgLoadedMethod">
          <p>Pertenencia</p>
          <small>30x40</small><br>
          <small>Luz led fotografiada</small>
        </div>
        <div class="itemVisual">
          <img src="@/assets/img/visual/solnaciente.jpg" alt="gradiente" @load="imgLoadedMethod">
          <p>Sol Naciente</p>
          <small>30x40</small><br>
          <small>Luz led fotografiada</small>
        </div>
        <div class="itemVisual">
          <img src="@/assets/img/visual/DSC_1339.jpg" alt="gradiente" @load="imgLoadedMethod">
          <p>Rojo a Azul</p>
          <small>30x40</small><br>
          <small>Luz led fotografiada</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Visual",
  data(){
    return{
      showImages:false
    }
  },
  methods: {
    imgLoadedMethod (e) {
      e.currentTarget.classList.add("show");
    }
  },
  mounted(){
    this.showImages= true;
  }
};
</script>
