<template>

	<div id="wrapper" >

		<div class="fixed-sidebar">
			<SidebarDispatcher/>
		</div>

		<div id="content-wrapper" class="d-flex flex-column" style="min-height: 100vh;">
			<div class="content">
				<Navbar/>

				<!-- Main content -->
				<div style="margin-top: 100px; margin-bottom: 100px;">
					<router-view/>
				</div>

			</div>

			<!-- <Footer /> -->

		</div>

		<ScrollToTop />
		<!-- <MockDataBtn />
		<MockDataModal /> -->

	</div>


</template>

<script setup lang="ts">

	import Navbar from './layout/Navbar.vue';
	import SidebarDispatcher from './layout/Sidebar.vue';
	import ScrollToTop from './layout/ScrollToTop.vue'
	// import MockDataBtn from './__temp__/components/MockDataBtn.vue'
	// import MockDataModal from './__temp__/components/MockDataModal.vue'
	// import { tempStore } from './__temp__/temp.store';

	// const $temp = tempStore()

	// console.log('$temp', $temp)


</script>


<style>
.fixed-sidebar {
  position: fixed;
  height: 100%;
  z-index: 90;
}

.container-fluid{
	padding-left: 16rem
}


</style>