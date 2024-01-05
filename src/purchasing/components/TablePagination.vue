<template>

    <nav aria-label="Page navigation example">
        <ul class="pagination">
        <li class="page-item">
            <a class="page-link" @click="changePage(1)" href="#">Previous</a>
        </li>
        <li class="page-item">
            <a class="page-link" @click="changePage(1)" href="#">1</a>
        </li>
        <li class="page-item">
            <a class="page-link" href="#">Next</a>
        </li>
        </ul>
    </nav>

</template>


<script setup lang="ts">

    // import { teamService, teamStore } from '..';

    // const $team = teamStore()

    const changePage = async(page: number) => {
        console.log('changePage', page)
        // const {currentPage, totalPages, totalItems, teams} = await teamService.findAll({page, pageSize: $team.pagination.perPage}) 
        // $team.setPagination(currentPage, totalPages, totalItems)
        // $team.setTeams(teams)
    }

</script>