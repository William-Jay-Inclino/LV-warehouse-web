<template>
    
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

        <!-- Sidebar - Brand -->
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
            <div class="sidebar-brand-text mx-3"> PowerHouse </div>
        </a>

        <!-- Divider -->
        <hr class="sidebar-divider">

        <li class="nav-item" :class="{'active': routeName === routeNames.dashboard}">
            <router-link :to="{name: routeNames.dashboard}" class="nav-link">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
            </router-link>
        </li>

        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePurchasing"
                aria-expanded="true" aria-controls="collapseTwo">
                <i class="fas fa-shopping-cart"></i>
                <span>Purchasing</span>
            </a>
            <div id="collapsePurchasing" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <router-link :to="{name: routeNames.purchasing_canvass}" class="collapse-item">
                        <span class="ml-2">Canvass</span>
                    </router-link>
                    <router-link :to="{name: routeNames.purchasing_rv}" class="collapse-item">
                        <span class="ml-2">RV</span>
                    </router-link>
                    <router-link :to="{name: routeNames.purchasing_canvass}" class="collapse-item">
                        <span class="ml-2">SPR</span>
                    </router-link>
                    <router-link :to="{name: routeNames.purchasing_canvass}" class="collapse-item">
                        <span class="ml-2">JO</span>
                    </router-link>
                    <router-link :to="{name: routeNames.purchasing_meqs}" class="collapse-item">
                        <span class="ml-2">MEQS</span>
                    </router-link>
                    <router-link :to="{name: routeNames.purchasing_canvass}" class="collapse-item">
                        <span class="ml-2">PO</span>
                    </router-link>
                </div>
            </div>
        </li>

        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseWarehousing"
                aria-expanded="true" aria-controls="collapseTwo">
                <i class="fas fa-warehouse"></i>
                <span>Warehousing</span>
            </a>
            <div id="collapseWarehousing" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <router-link :to="{name: routeNames.purchasing_canvass}" class="collapse-item">
                        <span class="ml-2">RR</span>
                    </router-link>
                    <router-link :to="{name: routeNames.purchasing_canvass}" class="collapse-item">
                        <span class="ml-2">OSRIV</span>
                    </router-link>
                    <router-link :to="{name: routeNames.purchasing_canvass}" class="collapse-item">
                        <span class="ml-2">SERIV</span>
                    </router-link>
                    <router-link :to="{name: routeNames.purchasing_canvass}" class="collapse-item">
                        <span class="ml-2">MRV</span>
                    </router-link>
                    <router-link :to="{name: routeNames.purchasing_canvass}" class="collapse-item">
                        <span class="ml-2">MCT</span>
                    </router-link>
                    <router-link :to="{name: routeNames.purchasing_canvass}" class="collapse-item">
                        <span class="ml-2">STV</span>
                    </router-link>
                    <router-link :to="{name: routeNames.purchasing_canvass}" class="collapse-item">
                        <span class="ml-2">MCRT</span>
                    </router-link>
                    <router-link :to="{name: routeNames.purchasing_canvass}" class="collapse-item">
                        <span class="ml-2">MST</span>
                    </router-link>
                </div>
            </div>
        </li>

        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseMotorpool"
                aria-expanded="true" aria-controls="collapseTwo">
                <i class="fas fa-car"></i>
                <span>Motorpool</span>
            </a>
            <div id="collapseMotorpool" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <router-link :to="{name: routeNames.purchasing_canvass}" class="collapse-item">
                        <span class="ml-2">Vehicle</span>
                    </router-link>
                    <router-link :to="{name: routeNames.purchasing_canvass}" class="collapse-item">
                        <span class="ml-2">Gas Slip</span>
                    </router-link>
                    <router-link :to="{name: routeNames.purchasing_canvass}" class="collapse-item">
                        <span class="ml-2">Trip Ticket</span>
                    </router-link>
                    <router-link :to="{name: routeNames.purchasing_canvass}" class="collapse-item">
                        <span class="ml-2">Other Services</span>
                    </router-link>
                </div>
            </div>
        </li>

        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseProject"
                aria-expanded="true" aria-controls="collapseTwo">
                <i class="fas fa-project-diagram"></i>
                <span>Project</span>
            </a>
            <div id="collapseProject" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <router-link :to="{name: routeNames.purchasing_canvass}" class="collapse-item">
                        <span class="ml-2">Bill Materials</span>
                    </router-link>
                    <router-link :to="{name: routeNames.purchasing_canvass}" class="collapse-item">
                        <span class="ml-2">Structure Mgnt</span>
                    </router-link>
                    <router-link :to="{name: routeNames.purchasing_canvass}" class="collapse-item">
                        <span class="ml-2">Assembly Mgnt</span>
                    </router-link>
                </div>
            </div>
        </li>

        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseDataManagement"
                aria-expanded="true" aria-controls="collapseTwo">
                <i class="fas fa-database"></i>
                <span>Data Management</span>
            </a>
            <div id="collapseDataManagement" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <router-link :to="{name: routeNames.purchasing_canvass}" class="collapse-item">
                        <span class="ml-2">Supplier</span>
                    </router-link>
                    <router-link :to="{name: routeNames.purchasing_canvass}" class="collapse-item">
                        <span class="ml-2">Unit</span>
                    </router-link>
                    <router-link :to="{name: routeNames.data_management_brand}" class="collapse-item">
                        <span class="ml-2">Item Brand</span>
                    </router-link>
                    <router-link :to="{name: routeNames.purchasing_canvass}" class="collapse-item">
                        <span class="ml-2">Item Type</span>
                    </router-link>
                    <router-link :to="{name: routeNames.purchasing_canvass}" class="collapse-item">
                        <span class="ml-2">Service</span>
                    </router-link>
                </div>
            </div>
        </li>


        
        <li class="nav-item">
            <router-link :to="{name: routeNames.purchasing_canvass}" class="nav-link">
                <i class="fas fa-chart-line"></i>
                <span>Reports</span>
            </router-link>
        </li>

    </ul>
</template>


<script setup lang="ts">
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { routeNames } from '../common'

    const route = useRoute();
    const routeName = computed( () => route.name) 

</script>