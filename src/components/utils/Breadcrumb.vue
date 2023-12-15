<template>
  <nav class="breadcrumb">
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <router-link :to="item.route">{{ `/ ${item.label}` }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.breadcrumb {
  margin: 10px 0 20px;
}
@media screen and (max-width:768px){
  .breadcrumb ul{
    justify-content: center;
  }
}
.breadcrumb ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.breadcrumb li {
  margin-right: 5px;
}

.breadcrumb li:last-child {
  margin-right: 0;
}

.breadcrumb a {
    font-size: 0.875rem;
  text-decoration: none;
  color: white;
  cursor: pointer;
  text-transform: capitalize;
  transition: color 0.1s ease-in;
}

.breadcrumb a:hover {
  color:rgba(256,256,256,0.7);
}
</style>
