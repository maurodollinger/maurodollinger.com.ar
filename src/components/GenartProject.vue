<template>
  <div class="container genart project">
    <div class="section">
      <Breadcrumb :items="breadcrumbItems" />
      <div v-if="generativeToken"  ref="listContainer">
        <h2>{{generativeToken.name}}</h2>
          <p><small>{{generativeToken.iterationsCount}} / {{generativeToken.supply}} editions minted</small></p>
         <ul class="genartContainer">
          <li :key="item.id" v-for="(item, index) in objkts" :ref="`item-${index}`" >
            <p>{{ item.name }}</p>
            <a href="#" @click="handleLink" :data-link="item.generationHash">
              <img :src="'https://gateway.fxhash.xyz/ipfs/' + fixURL(item.thumbnailUri)" :alt="item.name" >
            </a>          
            <small>{{`owned by ${item.owner.name}`}}</small>
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
  query User($slug: String, $skip: Int, $take: Int) {
    generativeToken(slug: $slug) {
        id
        name
        generativeUri
        thumbnailUri
        iterationsCount
        supply
        objkts(skip: $skip, take: $take) {
          generationHash
          name
          slug
          thumbnailUri
          displayUri
          id
          owner {
              name
          }
        }
    }
    }
`;



export default {
  
  name: "GenartProject",
  data() {
    return {
      generativeToken: null,
      generativeProjectId:this.$route.params.projectid,
      objkts:[],
      skip:0,
      take:10,
      loading:false,
      breadcrumbItems: [
        { label: "Home", route: "/" },
        { label: "Genart Projects", route: "/genart" },
      ]
    };
  },
  components: {
    Breadcrumb,
  },
  mounted(){
    this.fetchApi();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    fetchApi(){
        const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: graphqlQuery,
            variables: { 
                slug: this.generativeProjectId,
                skip:this.skip,
                take:this.take
            }
        }),
        };
        this.loading = true;

        fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(data => {
            this.generativeToken = data.data.generativeToken;

            const newItems = this.generativeToken.objkts;
            this.objkts = this.objkts.concat(newItems);
            this.skip += this.take;
            this.loading = false;
            this.$nextTick(() => this.animateList(newItems));
            })
        .catch(error => console.error('Error:', error));
    },
    fixURL(URL){
      return URL.replace(/^ipfs:\/\//, '');
    },
    animateList(newItems) {
      gsap.from(this.$refs.listContainer, { opacity: 0, y:10, duration: 1 });

      newItems.forEach((item, index) => {
        // Obtener la referencia del elemento nuevo
        const newItemRef = this.$refs[`item-${this.objkts.length - newItems.length + index}`];

        // Animar solo los elementos nuevos
        gsap.from(newItemRef, { opacity: 0, y:0, duration: 1, delay: index * 0.2, ease: 'power1.out' });
      });
    },
    handleScroll() {
      if (this.shouldLoadMore() && !this.loading) {
        console.log('fetch')
        this.fetchApi();
      }
    },
     shouldLoadMore() {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      return documentHeight - (scrollY + windowHeight) < 10;
    },
    handleLink(event){
      event.preventDefault();
      const link = `./${this.generativeProjectId}/${event.currentTarget.dataset.link}`
      this.$router.push(link);
    }
  }
};
</script>
