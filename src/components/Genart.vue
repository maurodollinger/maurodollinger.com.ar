<template>
  <div class="container genart">
    <div class="section">
      <Breadcrumb :items="breadcrumbItems" />
      <div v-if="generativeTokens" ref="listContainer">
        <h2>Generative Art Projects</h2>
        <ul class="genartContainer">
          <li :key="item.id" v-for="(item, index) in generativeTokens" :ref="`item-${index}`">
            <p>{{ item.name }}</p>
            <a @click="handleLink" href="#" :data-link="item.slug">
              <img :src="'https://gateway.fxhash.xyz/ipfs/' + fixURL(item.thumbnailUri)" :alt="item.name">
            </a>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Loading content...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import Breadcrumb from './utils/Breadcrumb.vue';

const endpoint = "https://api.v2-temp.fxhash.xyz/graphql";

const graphqlQuery = `
  query User($name: String) {
    user(name: $name) {
      name
      type
      id
      metadata
      description
      avatarUri
      generativeTokens {
        name
        thumbnailUri
        id
        slug
        objkts {
          generationHash
          id
        }
      }
    }
  }
`;

const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: graphqlQuery,
     variables: { name: 'mdollinger' }
  }),
};

export default {
  
  name: "Genart",
  data() {
    return {
      generativeTokens: null,
      breadcrumbItems: [
        { label: "Home", route: "/" },
      ]
    };
  },
  components: {
    Breadcrumb,
  },
  mounted(){
    this.fetchApi();
  },
  methods: {
    fetchApi(){
      fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(data => {
        this.generativeTokens = data.data.user.generativeTokens;
        this.$nextTick(this.animateList);
        })
      .catch(error => console.error('Error:', error));
    },
    fixURL(URL){
      return URL.replace(/^ipfs:\/\//, '');
    },
    animateList() {
      gsap.from(this.$refs.listContainer, { opacity: 0,  y:10, duration: 1 });
      this.generativeTokens.forEach((item, index) => {
        gsap.from(this.$refs[`item-${index}`], { opacity: 0, y:0, duration: 1, delay: index * 0.2 , ease:'power1.out' });
      });
    },
    handleLink(event){
      event.preventDefault();
      const link = './genart/' + event.currentTarget.dataset.link;
      this.$router.push(link);
    }
  }
};
</script>
