<template>
    <div class="cart-item">
        <img class="cart-iten_img" :src=" require('../assets/images/' + cart_item_data.image) " alt="img">
        <div class="cart-item_info">
            <p>Товар: {{cart_item_data.name}}</p>
            <p>Цена: {{cart_item_data.price}} P</p>
            <p>Артикул: {{cart_item_data.article}}</p>
        </div>
        <div class="cart-item_quantity">
            <p>Количество</p>
            <div class="item_quantity">
                <p class="cart-click" @click="lessItem">-</p>
                {{cart_item_data.quantity}}
                <p class="cart-click" @click="moreItem">+</p>
            </div>            
        </div>
        <button @click="deleteFromCart">Удалить</button>
    </div>
</template>

<script>
    export default {
        name: 'cart-item',
        props: {
            cart_item_data: {
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
            lessItem() {
                this.$emit('less')
            },
            moreItem() {
                this.$emit('more')
            },
            deleteFromCart() {
                this.$emit('deleteFromCart')
            }
        }              
    }
</script>

<style> 
    .cart-item {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        margin: 16px 0;
        padding: 10px;
        border: 2px solid rgb(202, 185, 185);
    }
    .cart-iten_img {
        height: 150px;
    }
    .cart-item_quantity {
        display: flex;
        flex-direction: column;
    }
    .item_quantity {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .cart-click {
        width: 20px;
        height: 20px;
        border: 1px solid black;
    }
</style>
