<template>
    <div class="container mt-5">
        <h1>All Books Data</h1>
        <!-- JSON 数据格式化显示 -->
        <pre v-if="jsondata">{{ JSON.stringify(jsondata, null, 2) }}</pre>
        <!-- 错误信息显示 -->
        <p v-if="error" class="text-danger">1Error fetching data: {{ error.message }}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "GetAllBookAPI",
    data() {
        return {
            jsondata: null, // 用于存储从 API 获取的图书数据
            error: null     // 用于存储可能的错误信息
        };
    },
    mounted() {
        this.getAllBooksAPI(); // 在组件挂载后调用 API
    },
    methods: {
        async getAllBooksAPI() {
            try {
                const response = await axios.get("https://countbooks-xcba6rhzhq-uc.a.run.app");
                this.jsondata = response.data; // 成功请求时将数据存入 jsondata
                this.error = null;
            } catch (error) {
                console.error('Error fetching books:', error);
                this.error = error; // 如果请求失败，存储错误信息
                this.jsondata = null;
            }
        },
    }
};
</script>