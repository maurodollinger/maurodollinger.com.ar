<template>
  <div class="container genart">
    <div class="section">
      <div id="visualCodeContainer" :class="(showImages)?'showImages':''">
          <div class="item">
            <div class="text">
            </div>            
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Genart",
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
