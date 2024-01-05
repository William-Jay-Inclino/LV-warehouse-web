<template>
    <div class="container-custom">
        <div class="container">
            <div class="row justify-content-center align-items-center">

                <!-- Card 1 -->
                <div class="col-md-4 mb-4">
                    <div class="card shadow bg-primary text-white">
                        <div class="card-body">
                            <h5 class="card-title">POWERSERVE</h5>
                            <a href="powerserve.html" class="stretched-link"></a>
                        </div>
                    </div>
                </div>

                <!-- Card 2 -->
                <div class="col-md-4 mb-4">
                    <div class="card shadow bg-primary text-white">
                        <div class="card-body">
                            <h5 class="card-title">SYSTEM</h5>
                            <a href="system.html" class="stretched-link"></a>
                        </div>
                    </div>
                </div>

                <!-- Card 3 -->
                <div class="col-md-4 mb-4">
                    <div class="card shadow bg-primary text-white">
                        <div class="card-body">
                            <h5 class="card-title">e-FORMS</h5>
                            <a href="e-forms.html" class="stretched-link"></a>
                        </div>
                    </div>
                </div>

                <!-- Card 4 -->
                <div class="col-md-4 mb-4">
                    <div class="card shadow bg-primary text-white">
                        <div class="card-body">
                            <h5 class="card-title">eCONNECT</h5>
                            <a href="econnect.html" class="stretched-link"></a>
                        </div>
                    </div>
                </div>

                <!-- Card 5 -->
                <div class="col-md-4 mb-4">
                    <div class="card shadow bg-primary text-white">
                        <div class="card-body">
                            <h5 class="card-title">POWERBILL</h5>
                            <a href="powerbill.html" class="stretched-link"></a>
                        </div>
                    </div>
                </div>

                <!-- Card 6 -->
                <div class="col-md-4 mb-4">
                    <div class="card shadow bg-primary text-white">
                        <div class="card-body">
                            <h5 class="card-title">LPS</h5>
                            <a href="lps.html" class="stretched-link"></a>
                        </div>
                    </div>
                </div>

                <!-- Card 7 -->
                <div class="col-md-4 mb-4">
                    <div class="card shadow bg-primary text-white">
                        <div class="card-body">
                            <h5 class="card-title">POWERHOUSE</h5>
                            <a @click="onClickPowerHouse" class="stretched-link"></a>
                        </div>
                    </div>
                </div>

                <!-- Card 8 -->
                <div class="col-md-4 mb-4">
                    <div class="card shadow bg-primary text-white">
                        <div class="card-body">
                            <h5 class="card-title">ACCOUNTING</h5>
                            <a href="accounting.html" class="stretched-link"></a>
                        </div>
                    </div>
                </div>

                <!-- Card 9 -->
                <div class="col-md-4 mb-4">
                    <div class="card shadow bg-primary text-white">
                        <div class="card-body">
                            <h5 class="card-title">POWERPAY</h5>
                            <a href="powerpay.html" class="stretched-link"></a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

    import { routeNames } from '../common/constants'
    import { useRouter } from 'vue-router';

    const router = useRouter()

    const onClickPowerHouse = () => {
        router.push({name: routeNames.dashboard})
    }

</script>

<style scoped>
    .container-custom {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        margin: 0;
    }

    .card {
        transition: transform 0.3s, box-shadow 0.3s;
        cursor: pointer;
    }

    .card:hover {
        transform: translateY(-10px);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    }
</style>
