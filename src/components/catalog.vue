<template>
    <div class="catalog">
        <nav>
            <div class="search_by_catalog">
                <input type="text" class="search_input" v-model="searchValue">
                <div class="search_btns">
                    <button class="search_btn" @click="searchByClick(searchValue)">Поиск</button>
                    <button class="search_btn" @click="clearSearch">Очистить</button>
                </div>
            </div>
            <router-link :to="{name: 'cart', params:{cart_data: CART}}">
                <div class="catalog_link_to_cart">Корзина: {{CART.length}}</div>
            </router-link>
        </nav>        
        <h1>Каталог</h1>
        <div class="filters">
            <div class="filter_male">
                <selection 
                    :options="categories"
                    @select="sortByCategories"
                    :selected="selected"
                />
            </div>
            <div class="filter_price">
                <div class="range-slider">
                    <input type="range" min="0" max="10000" step="100" 
                    v-model.number="minPrice"
                    @change="setRangeSlider"
                    >

                    <input type="range" min="0" max="10000" step="100" 
                    v-model.number="maxPrice"
                    @change="setRangeSlider"
                    >
                </div>
                <div class="range-values">
                    <p>Min: {{minPrice}}</p>
                    <p>Max: {{maxPrice}}</p>
                </div>
            </div>
        </div>                    
        <div class="catalog-list">
            <catalog-item 
                v-for="product in filteredProducts"
                :key="product.article"
                :product_data="product"
                @addToCart="addToCart"
            />
        </div>        
    </div>
</template>

<script>
    import CatalogItem from './catalog-item'
    import {mapActions, mapGetters} from 'vuex'
    import Selection from './select'

    export default {
        name: 'catalog',
        components: {
            CatalogItem,
            Selection
        },
        props: {},
        data() {
            return {
                searchValue: '',
                categories: [
                    {name: 'Все', value: 'все'},
                    {name: 'Мужские', value: 'м'},
                    {name: 'Женские', value: 'ж'}
                ],
                selected: 'Все',
                sortedProducts: [],
                minPrice: 0,
                maxPrice: 10000
            }
        },
        computed: {
            ...mapGetters([
                'PRODUCTS',
                'CART',
                'SEARCH_VALUE'
            ]),
            filteredProducts() {
                if(this.sortedProducts.length) {
                    return this.sortedProducts
                } else {
                    return this.PRODUCTS
                }
            },
        },
        methods: {
            ...mapActions([
                'GET_PRODUCTS_FROM_API',
                'ADD_TO_CART',
                'GET_SEARCH_VALUE'
            ]),
            searchByClick(value) {
                this.GET_SEARCH_VALUE(value);
            },
            clearSearch() {
                this.searchValue = ''
                this.GET_SEARCH_VALUE();
            },
            sortByCategories(category) {
                let vm = this;
                this.sortedProducts = [...this.PRODUCTS]
                this.sortedProducts = this.sortedProducts.filter(function(item) {
                    return item.price >= vm.minPrice && item.price <= vm.maxPrice
                })
                if(category) {
                    this.sortedProducts = this.sortedProducts.filter(function(i) {
                        vm.selected === category.name
                        return i.category === category.name
                    })
                }
            },
            addToCart(data) {
                this.ADD_TO_CART(data)
            },
            setRangeSlider() {
                if(this.minPrice > this.maxPrice) {
                    let temp = this.maxPrice;
                    this.maxPrice = this.minPrice;
                    this.minPrice = temp;
                }
                this.sortByCategories()
            },
            sortProductsBySearch(value) {
                this.sortedProducts = [...this.PRODUCTS]
                if(value ){
                    this.sortedProducts = this.sortedProducts.filter(function(item) {
                        return item.name.toLowerCase().includes(value.toLowerCase())
                    }) 
                } else {
                    this.sortedProducts = this.PRODUCTS;
                }               
            }
        },
        watch: {
            SEARCH_VALUE() {
                this.sortProductsBySearch(this.SEARCH_VALUE);
            }
        },
        mounted() {
            this.GET_PRODUCTS_FROM_API()
                .then((response) => {
                    if(response.data) {
                        this.sortByCategories(),
                        this.sortProductsBySearch(this.SEARCH_VALUE)
                    }
                })
        }       
    }
</script>

<style>
    nav {
        display:flex;
        justify-content: space-between;
        align-items: center;
        height: 100px;
        background-color: rgb(202, 185, 185);
        padding: 0 25px;
    }
    .search_btn {
        width: 50%;
    }
    .catalog_link_to_cart{
        width: 100px;
        height: 50px;
        background-color: #fff;
        box-sizing: border-box;
        padding-top: 15px;
        color: black;
    }
    .catalog-list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
    }
    .filters {
        display: flex;
        justify-content: space-around;
        align-items: center;
        border: 5px solid rgb(202, 185, 185);
    }
    .filter_price{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .range-slider {
        width: 200px;
        margin: auto 16px;
        text-align: center;
        position: relative;
    }
    .range-slider input[type=range] {
        position: absolute;
        left: 0;
        bottom: 0;
    }
    input[type=range]::-webkit-slider-thumb {
        z-index: 2;
        position: relative;
        top: 2px;
        margin-top: -7px;
    }
</style>
