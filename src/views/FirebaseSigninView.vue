<template>
    <h1>Create an Accounta</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Register</button></p>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from 'vue-router'
const email = ref("")
const password = ref("")
const router = useRouter()
const auth = getAuth()
const register = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log("Firebase Login Successfull!")
            router.push("/")
        }).catch((error) => {
            console.log(error.code);
        })
};
</script>