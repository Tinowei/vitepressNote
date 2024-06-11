<template>

    <a class="card" :href="link">
        <div class="card-body">
            <img :src="image" alt="">
            <div class="gray">{{name}}</div>
        </div>
        <p class="product-name">{{name}}</p>
    </a>

</template>

<script>
export default {
    name: 'MyCard',
    props:{
        image:String,
        name:String,
        link:String
    }
};
</script>


<style scoped>
        @property --rotate {
            syntax: "<angle>";
            initial-value: 132deg;
            inherits: false;    
        }

        .card {
            display: inline-block;
            margin: 40px 20px 20px 20px;
        }

        .card-body {
            background-color: #191c29;
            /* border: 1px solid black; */
            width: 300px;
            height: 200px;
            padding: 3px;
            position: relative;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            /* text-align: center; */
            font-size: 1.5em;
            /* color: rgb(88 199 250 / 0%); */
            /* color: black; */
            /* background-image: url("./HW_Shopline.png"); */
            background-repeat: no-repeat;
            background-size: 150%;
            background-position: center; /* 背景圖片居中 */
            cursor: pointer;
            font-family: cursive;
        }
        .gray {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 28px;
            color: #191c29;
            font-weight: 800;
            border-radius: 8px;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(138, 135, 135, 0.5); /* 灰色且有透明度 */
            opacity: 0;
            transition: opacity 0.3s;
        }
        img {
            width: 340px;
            height: 200px;
            object-fit: cover;
            position: absolute;
            border-radius: 8px;
        }

        /* .card:hover {
            color: rgb(88 199 250 / 100%);
            transition: color 1s;
        } */

        .card-body:hover .gray {
            opacity: 1;
            transition: .3s;
        }

        .card-body:hover:before, .card-body:hover:after {
            animation: none;
            opacity: 0;
        }

        .card-body::before {
            content: "";
            width: 104%;
            height: 104%;
            border-radius: 8px;
            background-image: linear-gradient(var(--rotate), #5ddcff, #3c67e3 43%, #4e00c2);
            position: absolute;
            z-index: -1;
            top: -2%;
            left: -2%;
            animation: spin 2.5s linear infinite;
        }

        .card-body::after {
            position: absolute;
            content: "";
            top: calc(var(--card-height) / 6);
            left: 0;
            right: 0;
            z-index: -1;
            height: 100%;
            width: 100%;
            margin: 0 auto;
            transform: scale(0.8);
            filter: blur(calc(var(--card-height) / 6));
            background-image: linear-gradient(var(--rotate), #5ddcff, #3c67e3 43%, #4e00c2);
            opacity: 1;
            transition: opacity .5s;
            animation: spin 2.5s linear infinite;
        }

        @keyframes spin {
            0% {
                --rotate: 0deg;
            }
            100% {
                --rotate: 360deg;
            }
        }
        
        a {
            text-decoration: none;
            text-align: center;
        }

        p.product-name {
            margin-top: 30px;
            font-size: 20px;
            font-weight: 900;
            color: aliceblue;
            font-family: cursive;
            /* 陰影 */
            text-shadow: 20px 0 10px rgba(255, 255, 255, 0.5);
            animation: shadow-pulse 3s infinite;
        }

        @keyframes shadow-pulse {
            0% {
                text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
            }
            50% {
                text-shadow: 0 0 10px rgba(255, 255, 255, 1);
            }
            100% {
                text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
            }
        }
</style>