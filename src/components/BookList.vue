<template>
    <div>
        <h1>Books Chart (ISBN > 1000)</h1>
        <canvas id="booksChart"></canvas> <!-- 图表容器 -->
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { collection, query, where, getDocs } from 'firebase/firestore';
import db from '../firebase/init.js';
import { Chart, registerables } from 'chart.js';

// 注册 Chart.js 模块
Chart.register(...registerables);

export default {
    setup() {
        const books = ref([]); // 存储书籍数据的响应式变量

        // 从 Firestore 获取数据
        const fetchBooks = async () => {
            try {
                const q = query(collection(db, 'books'), where('isbn', '>', 1000));
                const querySnapshot = await getDocs(q);
                const booksArray = [];
                querySnapshot.forEach((doc) => {
                    booksArray.push({ id: doc.id, ...doc.data() });
                });
                books.value = booksArray;
                createChart(booksArray); // 在获取数据后创建图表
            } catch (error) {
                console.error('Error fetching books: ', error);
            }
        };

        // 创建图表
        const createChart = (booksArray) => {
            const ctx = document.getElementById('booksChart').getContext('2d');

            // 图表数据配置
            const chartData = {
                labels: booksArray.map(book => book.name), // 图表标签为书籍名称
                datasets: [{
                    label: 'ISBN Number',
                    data: booksArray.map(book => book.isbn), // 图表数据为 ISBN
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            };

            // 创建图表实例
            new Chart(ctx, {
                type: 'bar', // 图表类型为柱状图
                data: chartData,
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true // Y轴从零开始
                        }
                    }
                }
            });
        };

        onMounted(() => {
            fetchBooks(); // 在组件挂载时获取数据
        });

        return {
            books
        };
    }
}
</script>

<style scoped>
#booksChart {
    max-width: 800px;
    margin: 0 auto;
}
</style>