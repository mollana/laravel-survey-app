<template>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" :src="`${baseURL}/images/icons8-tailwindcss-48.png`" alt="Your Company" />
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>
        <!-- <pre>{{ asset('/images/icons8-tailwindcss-48.png') }}</pre> -->
        <form class="space-y-6 mt-5" action="#" @submit="login">
            <Alert v-if="errorMsg">
                {{ errorMsg }}
                <span @click="errorMsg = ''" class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </span>
            </Alert>
            <div>
                <div class="flex items-center justify-top">
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                </div>
                <div class="mt-2">
                    <input id="email" name="email" type="email" autocomplete="email" required="" v-model="user.email"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                </div>
                <div class="mt-2">
                    <input id="password" name="password" type="password" autocomplete="current-password" required="" v-model="user.password"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>

            <div class="flex items-center">
                <div>
                    <label for="remember-me" class="block text-sm font-medium leading-6 text-gray-900">Remeber me</label>
                </div>
                <div class="mx-2">
                    <input id="remember-me" name="remember-me" type="checkbox" v-model="user.remember"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                </div>
            </div>

            <div>
                <button :disabled="loading" type="submit" class="group relative flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    :class="{'cursor-not-allowed': loading, 'hover:bg-indigo-500': loading}"
                >
                    <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>                        
                    </span>
                    <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sign in
                </button>
            </div>
        </form>

        <p class="mt-10 text-center text-sm text-gray-500">
            Not a member?
            {{ ' ' }}
            <router-link :to="{name: 'Register'}" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register for free</router-link>
        </p>
    </div>
</template>

<script setup>

import store from '../store';
import { useRouter } from "vue-router";
import { ref } from "vue";
import Alert from '../components/Alert.vue';

const router = useRouter();

const user = {
    email: '',
    password: '',
    remember: false
}

const loading = ref(false);

let errorMsg = ref("");

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

function login(ev) {
    ev.preventDefault();

    loading.value = true;
    store.dispatch('login', user)
        .then(() => {
            loading.value = false;
            router.push({
                name: 'Dashboard'
            })
        })
        .catch(err => {
            loading.value = false;
            errorMsg.value = err.response.data.error
        })
}

</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
