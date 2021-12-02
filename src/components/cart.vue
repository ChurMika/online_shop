<template>
    <div class="cart">
        <nav class="nav">
            <router-link :to="{name: 'catalog'}">
                <div class="cart_link_to_catalog">Каталог</div>
            </router-link>
        </nav>
        <h1>Корзина</h1>
        <p v-if="!cart_data.length">Ваша корзина пуста</p>
        <div class="cart_info">
            <div class="cart_item">
                <cart-item 
                    v-for="(item, index) in cart_data"
                    :key="item.article"
                    :cart_item_data="item"
                    @deleteFromCart="deleteFromCart(index)"
                    @less="less(index)"
                    @more="more(index)"
                />
            </div>
            <div class="cart_total">
                <p>Итого:</p>
                <p>{{cartTotalCost}} P</p>
            </div>
        </div>
    </div>
</template>

<script>
import CartItem from './cart-item'
import {mapActions} from 'vuex'

    export default {
        name: 'cart',
        components: {
            CartItem
        },
        props: {
            cart_data: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {}
        },
        computed: {
            cartTotalCost() {
                let result = []

                if(this.cart_data.length) {
                    for(let item of this.cart_data) {
                        result.push(item.price * item.quantity);
                    }
                    result = result.reduce(function(sum, el) {
                        return sum + el;
                    })
                    return result;                    
                } else {
                    return 0;
                }

                
            }
        },
        methods: {
            ...mapActions([
                'DELETE_FROM_CART',
                'LESS_ITEM',
                'MORE_ITEM'
            ]),
            less(index) {
                this.LESS_ITEM(index)
            },
            more(index) {
                this.MORE_ITEM(index)
            },
            deleteFromCart(index) {
                this.DELETE_FROM_CART(index)
            }
        }        
    }
</script>

<style>
    .nav {
        display:flex;
        justify-content: flex-end;
        align-items: center;
        height: 100px;
        background-color: rgb(202, 185, 185);
        padding: 0 25px;
    }
    .cart_link_to_catalog {
        color: black;
    }
    .cart_info {
        width: 900px;
    }
    .cart_total {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
</style>
