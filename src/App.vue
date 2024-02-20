<template>
    <div id="nav">
        <router-link to="/"></router-link>
        <router-link to="/home"></router-link>
        <router-link to="/edit"></router-link>
        <router-link to="/trades"></router-link>
    </div>
    <router-view/>
</template>
<script>
export default {
    brokerName: 'App',
    data() {
        return {msg: "Привет Vue"}
    }
}
</script>
<style scoped>
h3 {
    color: green;
}
</style>
