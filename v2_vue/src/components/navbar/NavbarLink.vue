<template>
    <li class="nav-item"><a class="nav-link active" role="button">{{ text }}</a></li>
</template>

<script>
    export default {
        props: {
            text: {
                type: String,
            },
            link: {
                type: String,
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>