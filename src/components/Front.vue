<template>
  <div id="frontendcontainer" class="container">
    <div class="section">
      <Breadcrumb :items="breadcrumbItems" />
      <div class="item" v-for="(project, index) in projects" :key="index" ref="projectItems">
      <div class="image-container">
        <img :src="project.image" :alt="project.title" class="project-image"  @click="toggleOverlay(index)">
        <div  v-if="project.showOverlay" class="overlay">
          <h2>{{ project.title }}</h2>
          <p>{{ project.description }}</p>
          <div class="links">
            <a :href="project.liveLink" target="_blank">Live site</a>
            <a :href="project.githubLink" target="_blank">Github</a>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from './utils/Breadcrumb.vue';
import gsap from 'gsap';

export default {
  name: "FrontEnd",
  components:{
    Breadcrumb
  },
  data(){
    return{
      projects:[
        {
        title: 'Audiophile Ecommerce',
        image: require('@/assets/img/frontend/audiophile-preview.jpg'),
        description: 'Responsive ecommerce built with React and Sass',
        liveLink: 'https://maurodollinger.github.io/audiophile-ecommerce-website/',
        githubLink: 'https://github.com/maurodollinger/audiophile-ecommerce-website/',
        showOverlay:true,
      },
      {
        title: 'Devjobs Webapp',
        image: require('@/assets/img/frontend/devjobs-preview.jpg'),
        description: 'Responsive website built with React and Sass with Firebase',
        liveLink: 'https://maurodollinger.github.io/devjobs-web-app/build/',
        githubLink: 'https://github.com/maurodollinger/devjobs-web-app',
        showOverlay:true,
      },
      {
        title: 'Interactive Comment Section',
        image: require('@/assets/img/frontend/desktop-preview.jpg'),
        description: 'Built with React and Sass with Firebase',
        liveLink: 'https://maurodollinger.github.io/interactive-comment-section/build/',
        githubLink: 'https://github.com/maurodollinger/interactive-comment-section',
        showOverlay:true,
      },
      {
        title: 'Spacetourism',
        image: require('@/assets/img/frontend/spacetourism.webp'),
        description: 'Built with React and Sass',
        liveLink: 'https://maurodollinger.github.io/spacetourism/build/',
        githubLink: 'https://github.com/maurodollinger/spacetourism',
        showOverlay:true,
      }
      ],
      breadcrumbItems: [
        { label: "Home", route: "/" },
      ]
    }
  },
  mounted(){
    this.animateProjects();
  },
  methods:{
    animateProjects() {
      const projectItems = this.$refs.projectItems;

      gsap.from(projectItems, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power1.out',
      });

      if (window.innerWidth <= 768) {
      this.projects.forEach((project, index) => {
        this.$set(this.projects, index, {
          ...project,
          showOverlay: false,
        });
       });
      }
    },
    toggleOverlay(index) {
      this.$set(this.projects, index, {
        ...this.projects[index],
        showOverlay: !this.projects[index].showOverlay,
      });
    },
  }
};
</script>
