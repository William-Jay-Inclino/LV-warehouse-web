<template>

    <div class="input-group">
        <div class="input-group-prepend">
            <button @click="onClickRefresh()" class="btn btn-primary">
                <i class="fas fa-sync"></i>
            </button>
        </div>
        <input @keyup.enter="onClickSearch()" type="text" v-model="searchVal" class="form-control" :placeholder="placeholder" @input="validateInput()">
        <div class="input-group-append">
            <div class="btn-group">
                <button @click="onClickSearch()" type="button" class="btn btn-primary">
                    Search for {{ searchRefObject[searchRef] }}
                </button>
                <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="sr-only"></span>
                </button>
                <div class="dropdown-menu">
                    <a @click="onChangeRef(SearchFieldEnum.RCNumber)" class="dropdown-item" href="#"> RC Number </a>
                    <a @click="onChangeRef(SearchFieldEnum.Requisitioner)" class="dropdown-item" href="#"> Requisitioner </a>
                    <a @click="onChangeRef(SearchFieldEnum.Date)" class="dropdown-item" href="#">Date</a>
                </div>
                </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';
import { SearchFieldEnum } from '../entities/purchasing.enums';
    // import { SearchFieldEnum, teamService, teamStore } from '..';
    

    const searchRefObject = {
        [SearchFieldEnum.RCNumber]: 'RC Number',
        [SearchFieldEnum.Requisitioner]: 'Requisitioner',
        [SearchFieldEnum.Date]: 'Date',
    }

    // const $team = teamStore()

    const searchRef = ref<SearchFieldEnum>(SearchFieldEnum.RCNumber)
    const searchVal = ref('')

    const onChangeRef = (ref: SearchFieldEnum) => {
        searchVal.value = ''
        searchRef.value = ref
    }

    const placeholder = computed( () => {
        return `Search for ${searchRefObject[searchRef.value]}...`
    })

    const onClickSearch = async() => {
        console.log('onClickSearch()')

        // if(searchVal.value === '') return 

        // if(searchVal.value.trim() === '') return 

        // const {currentPage, totalPages, totalItems, teams} = await teamService.findAll({
        //     page: $team.pagination.currentPage, 
        //     pageSize: $team.pagination.perPage,
        //     searchField: searchRef.value,
        //     searchValue: searchVal.value,
        // }) 
        // $team.setPagination(currentPage, totalPages, totalItems)
        // $team.setTeams(teams)
    }

    const onClickRefresh = async() => {
        console.log('onClickRefresh()')
        // const {currentPage, totalPages, totalItems, teams} = await teamService.findAll({page: 1, pageSize: $team.pagination.perPage}) 
        // $team.setPagination(currentPage, totalPages, totalItems)
        // $team.setTeams(teams)
    }

    const validateInput = () => {
        searchVal.value = searchVal.value.replace(/[^A-Za-z0-9 ]/g, '');
    }

</script>