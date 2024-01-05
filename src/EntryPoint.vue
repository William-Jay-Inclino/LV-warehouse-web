<template>
	<component :is="currentComponent" />
</template>
  
  <script setup lang="ts">
	import App from './App.vue';
	import Login from './__temp__/Login.vue';
	import Home from './__temp__/Home.vue';
	import { useRoute } from 'vue-router';
	import { computed } from 'vue';
	import { routeNames } from './common';
	
	const route = useRoute();
	
	const currentComponent = computed(() => {

		if (route.path === '/') {

			console.log('LOGIN COMPONENT RENDERED')
			return Login;

		} else if (route.name === routeNames.home) {

			console.log('HOME COMPONENT RENDERED')
			return Home;

		}
		else {

			console.log('MAIN COMPONENT RENDERED')
			return App;

		}
	});
  </script>
  ./__temp__/Login.vue./__temp__/Home.vue