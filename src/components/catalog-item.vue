<template>
    <div class="catalog-item">
        <img class="catalog-item_image" :src=" require('../assets/images/' + product_data.image) " alt="img">
        <p class="catalog-item_name">{{product_data.name}}</p>
        <p class="catalog-item_price">Цена: {{product_data.price}} Р</p>
        <button class="catalog-item_button btn" @click="addToCart">Добавить</button>
    </div>
</template>

<script>
    export default {
        name: 'catalog-item',
        props: {
            product_data: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {}
        },
        computed: {},
        methods: {
            addToCart() {
                this.$emit('addToCart', this.product_data)
            }
        },
        mounted() {
            this.$set(this.product_data, 'quantity', 1)
        }          
    }
</script>

<style>
    .catalog-item {
        margin: 16px;
        padding: 16px;
        box-shadow: 0 0 8px 0 #e8e8e0;
    }
    .catalog-item_image {
        height: 250px;
    }
</style>
