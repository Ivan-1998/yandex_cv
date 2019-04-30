<template>
    <div class="content">
        <header-component></header-component>
        <router-view></router-view>    
    </div>
</template>

<script>
// Components
import Header from './Components/Header/Header';

export default ({
    name: 'Skeleton',
    components: {
        'header-component': Header
    }
});
</script>