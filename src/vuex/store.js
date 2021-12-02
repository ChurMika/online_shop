import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        searchValue: '',
        products: [],
        cart: [],
        
    },
    mutations: {
        SET_SEARCH_VALUE: (state, value) => {
          state.searchValue = value;
        },
        SET_PRODUCTS_TO_STATE: (state, products) => {
            state.products = products;
          },
        SET_CART: (state, product) => {
          if (state.cart.length) {
            let isProductExists = false;
            state.cart.map(function(item) {
              if (item.article === product.article) {
                isProductExists = true;
                item.quantity++
              }
            })
            if (!isProductExists) {
              state.cart.push(product)
            }
          } else {
            state.cart.push(product)
          }
        },
        REMOVE_FROM_CART: (state, index) => {
          state.cart.splice(index, 1)
        },
        LESS: (state, index) => {
          if(state.cart[index].quantity > 1) {
            state.cart[index].quantity--
          }          
        },
        MORE: (state, index) => {
          state.cart[index].quantity++
        }
    },
    actions: {
        GET_PRODUCTS_FROM_API({commit}) {
            return axios('http://localhost:3000/products', {
              method: "GET"
            })
              .then((products) => {
                commit('SET_PRODUCTS_TO_STATE', products.data);
                return products;
              })
              .catch((error) => {
                console.log(error)
                return error;
              })
        },
        ADD_TO_CART({commit}, product) {
          commit('SET_CART', product);
        },
        GET_SEARCH_VALUE({commit}, value) {
          commit('SET_SEARCH_VALUE', value)
        },
        LESS_ITEM({commit}, index) {
          commit('LESS', index);
        },
        MORE_ITEM({commit}, index) {
          commit('MORE', index);
        },
        DELETE_FROM_CART({commit}, index) {
          commit('REMOVE_FROM_CART', index);
        }
    },
    getters: {
        SEARCH_VALUE(state) {
          return state.searchValue;
        },
        PRODUCTS(state) {
          return state.products;
        },
        CART(state) {
          return state.cart;
        }
    }
});

export default store;