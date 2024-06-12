<template>
    <div class="themeIntro">
        <div class="introduction-card">
            <img :src="image">
            <div class="description">
                <p class="title">Tino's Notes</p>
                <div class="content">
                    從0到放棄的學習筆記
                </div>
                <div class="note-group">
                    <a class="badge"
                        v-for="(link,index) in links" 
                        :key="index"
                        :href="link.href"
                        >{{link.text}}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyProfile',
    props:{
        image:String,
        links:{
            type:Array,
            required:true,
            default:()=>[]
        }

    }
};
</script>



<style scoped>
       .themeIntro {
        margin-top:50px ;
        width: 90%;
        height: 400px;
        background-color: #3c3535;
        /* padding: 20px; */
        border-radius: 20px;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
        display: flex;
        /* justify-content: center; */
        align-items: center;
    }

    .themeIntro::after {
        content: "";
        width: 90%;
        height: 400px;
        /* padding: 20px; */
        rotate: -3deg;
        position: absolute;
        /* left: 0; */
        background-color: #1e61be;
        background: rgb(2,0,36);
background: linear-gradient(333deg, rgba(2,0,36,1) 0%, rgba(43,43,203,1) 20%, rgba(0,212,255,1) 76%);
        box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.5);
        border-radius: 20px;
    }

    

    .introduction-card {
        width: 50%;
        height: 300px;
        background-color: #fff;
        border-radius: 20px;
        display: flex;
        justify-content: baseline;
        /* padding: 20px; */
        box-shadow: 5px 5px 20px #00000080;
        z-index: 1;
        animation: drift 3s infinite;
    }

    @keyframes drift {
        0% {
            box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.5);
        }
        50% {
            box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);
        }
        100% {
            box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.5);
        }
    }



    .introduction-card img {
        width: 40%;
        height: 300px;
        object-fit: cover;
        border-radius: 20px;
        margin-right: 20px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .description {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 10px;
        /* outline: 1px solid black; */
    }
    .description .title {
        color: #000;
        font-size: 35px;
        font-weight: 900;
        /* font-family: cursive; */
        padding-top: 30px;
    }

    .introduction-card .content {
        font-size: 20px;
        /* outline: 1px solid black; */
        display: flex;
        /* align-items: center; */
        flex-grow: 1;
        color: #7b7878;
        font-weight: 800;
        margin-top: 10px;
        /* flex-direction: column; */

    }
    .note-group {
        display: flex;
        flex-wrap: wrap;
        /* outline: 1px solid black; */
        margin: 20px 0;
    }

    a.badge {
        /* outline: 1px solid black; */
        text-decoration: none;
        font-size: 12px;
        color: #fff;
        background-color: #322f2f;
        border-radius: 20px;
        display: inline-block;        
        padding: 5px 15px;
        margin: 5px 10px 5px 0;
    }
    a.badge:hover {
        background-color: #7e7474;
        transition: .3s;
    }


    


    @media (max-width: 768px) {

        .introduction-card {
        width: 100%;
        height: 300px;
        background-color: #fff;
        border-radius: 20px;
        display: flex;
        /* justify-content: baseline; */
        flex-direction: column;
        /* padding: 20px; */
        box-shadow: 5px 5px 20px #00000080;
        z-index: 1;
        animation: drift 3s infinite;
    }

    .introduction-card img {
        width: 100%;
        height: 50%;
        object-fit: cover;
        border-radius: 20px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

  .description .title {
    font-size: 22px;
    margin-top: -30px;
  }
  .description .content {
    font-size: 16px;
  }
  a.badge {
    font-size: 10px;
    padding: 3px 10px;
  }
}
</style>

