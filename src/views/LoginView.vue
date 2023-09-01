<script>
import { RouterLink } from 'vue-router';
export default {
    components: {
    },
    data() {
        return {
            account: null,
            password: null
        }
    },
    methods: {
        login(){
            let body = {
                "account": this.account,
                "password": this.password
            }
            fetch('http://localhost:8080/log_in', {
                method: 'POST',
                // 連結後端跟前端的session
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                if(data.message !== undefined){
                    alert(data.message)
                }
            })
        },
    },
    mounted() {
       
    }
}
</script>
<template>
    <div class="d-flex flex-column justify-content-center text-center mt-5">
        
        <!-- Form Area -->
        <form class="mt-5">
            <div class="d-flex flex-column col-3 m-auto mb-3 mt-5">
                <label for="account" class="text-sm-start">Account</label>
                <input v-model="account" type="text"
                class="form-control">
            </div>

            <div class="d-flex flex-column col-3 m-auto mb-5 ">
                <label for="password" class="text-sm-start ">Password</label>
                <input v-model="password" type="password"
                class="form-control">
            </div>
        </form>

        <!-- Button Area -->
        <div class="">
            <button type="button" class="btn btn-light mx-2"
            style="background-color: rgb(232, 220, 183);">
                Sign up
            </button>
            <RouterLink @click="login()" to="/home" type="button" class="btn btn-light mx-2"
            style="background-color: rgb(232, 176, 107);">
                Log in
            </RouterLink>
        </div>
    </div>
</template>
<style scoped>
   
</style>