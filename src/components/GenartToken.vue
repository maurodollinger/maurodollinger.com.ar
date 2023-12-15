<template>
  <div class="container genart token">
    <div class="section">
      <Breadcrumb :items="breadcrumbItems" />
      <div v-if="token"  ref="listContainer">
        <h2>{{token.name}}</h2>
        <div class="squareContainer">
            <div class="squareContainerContent">
                <div class="artworkFrame">
                    <div class="iframeContainer">
                      <iframe :src="tokenipfs"  sandbox="allow-scripts allow-same-origin allow-modals" allow="accelerometer *; camera *; gyroscope *; microphone *; xr-spatial-tracking *;"></iframe>
                     </div>
                </div>
            </div>
        </div>
        <div class="infoToken">
          <p>{{token.metadata.description}}</p>
          <p>{{`owned by ${token.owner.name}`}}</p>
          <a :href="externalUrl" target="_blank">View on FxHASH</a>
        </div>
        
      </div>
      <div v-else>
        <p>Loading content...</p>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from './utils/Breadcrumb.vue';
const endpoint = "https://api.v2-temp.fxhash.xyz/graphql";

const graphqlQuery = `
  query User($hash: String) {
    objkt(hash: $hash) {
        id
        name
        iteration
        metadata
        minter{
          id
        }
        owner {
         name
        }
      }
    }
`;



export default {
  
  name: "GenartProject",
  data() {
    return {
      token: null,
      tokenid:this.$route.params.tokenid,
      tokenipfs:null,
      loading:false,
      externalUrl:'',
      breadcrumbItems: [
        { label: "Home", route: "/" },
        { label: "Genart Projects", route: "/genart" },
        { label: this.$route.params.projectid, route: "/genart/"+this.$route.params.projectid },
      ]
    };
  },
  mounted(){
    this.fetchApi();
  },
  components: {
    Breadcrumb,
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
                hash: this.tokenid,
            }
        }),
        };
        this.loading = true;

        fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(data => {
            this.token = data.data.objkt;
            this.loading = false;
            this.externalUrl =  `https://www.fxhash.xyz/gentk/${this.token.id}`;
            let metadata = data.data.objkt.metadata;
            let obj = data.data.objkt;
            this.tokenipfs = `https://gateway.fxhash2.xyz/ipfs/${this.fixURL(metadata.generatorUri)}/?fxhash=${metadata.iterationHash}&fxiteration=${obj.iteration}&fxminter=${obj.minter}`;

            })
        .catch(error => console.error('Error:', error));
    },
    fixURL(URL){
      return URL.replace(/^ipfs:\/\//, '');
    }
  }
};
</script>
