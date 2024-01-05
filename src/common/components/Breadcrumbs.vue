<template>

    <!-- <div class="card mb-5">
        <div class="card-body"> -->
            <nav aria-label="breadcrumb" class="m-0 p-0">
                <ol class="breadcrumb mb-0">
                    <li v-for="item in items" class="breadcrumb-item" aria-current="page">
                        <router-link :to="{name: item.route}" class="item" :class="{'text-secondary active-item': item.isActive}">
                            <span>{{ item.text }}</span>
                        </router-link>
                    </li>
                </ol>
            </nav>
        <!-- </div>
    </div> -->


</template>


<script setup lang="ts">

    defineProps<{
        items: {text: string, route: string, isActive: boolean}[]
    }>()
    // items: {text: string, link: string, isActive: boolean}
</script>


<style scoped>

    .active-item{
        pointer-events: none;
    }

    .item{
        text-decoration: none; 
    }
    

</style>