<template>
    <form class="form-inline">
      <div class="form-group mx-sm-3 mb-2">
        Show
        <select @change="onChange()" class="form-control ml-1">
          <option v-for="option in [10, 20, 50, 100]" :key="option" :value="option">{{ option }}</option>
        </select>
        <span class="ml-2">items per page</span>
      </div>
    </form>
  </template>

<script setup lang="ts">

    // import { teamService, teamStore } from '..';

    // const $team = teamStore()
    
    const onChange = async() => {
      console.log('onChange()')
      // const {currentPage, totalPages, totalItems, teams} = await teamService.findAll({page: $team.pagination.currentPage, pageSize: $team.pagination.perPage}) 
      // $team.setPagination(currentPage, totalPages, totalItems)
      // $team.setTeams(teams)
    }

</script>