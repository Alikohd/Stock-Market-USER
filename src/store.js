import { createStore } from 'vuex';

const store = createStore({
    state() {
        let data  = JSON.parse(localStorage.getItem("store_data"))
        return {
            Data: data !== null ? data : {}
        };
    },
    // методы для синхронных изменений
    mutations: {
        setUser(state, data) {
            state.Data.user = data;
            localStorage.setItem("store_data", JSON.stringify(state.Data))
        },
        setUserName(state, data){
            state.Data.user.name = data;
            localStorage.setItem("store_data", JSON.stringify(state.Data))
        },
        setUserBalance(state, data){
            state.Data.user.balance = data;
            localStorage.setItem("store_data", JSON.stringify(state.Data))
        }
    },

    // методы для доступа к состоянию
    getters: {
        // получение данных пользователя из состояния
        getUser: state => state.Data.user
    }
});

export default store;