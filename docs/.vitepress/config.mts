import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:'/./',
  title: "Tino's Notes",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '🏠 Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' },
      { text: 'JavaScript', link: '/Javascript/javascript' },
      { text: 'Vue', link: '/Vue/Ch01' },
      { text: 'SQL', link: '/SQL/basic' },
      { text: 'ORM', link: '/ORM/dapper' }
    ],

    sidebar: [
      
      // {
      //   text: 'Examples',
      //   items: [
      //     { text: 'Markdown Examples', link: '/markdown-examples' },
      //     { text: 'Runtime API Examples', link: '/api-examples' },
      //   ]
      // },
      {
        text: 'Javascript',
        collapsed: true,
          items: [
            { text: 'JS筆記', link: '/Javascript/javascript' },
          ]
      },
      {
        text:'Vue',
        collapsed:true,
        items:[
          {text:'快速建置VUE3 Project', link:'/Vue/Ch01'},
          {text:'Project Structure and Entry Points', link:'/Vue/Ch02'},
          {text:'v-if , v-else-if , v-else , v-show', link:'/Vue/Ch03'},
          {text:'v-for', link:'/Vue/Ch04'},
          {text:'function', link:'/Vue/Ch05'},
          {text:'v-model 雙向綁定 , 關於Form表單', link:'/Vue/Ch06'},
          {text:'Computed , Methods , Watch', link:'/Vue/Ch07'},
          {text:'Component 元件', link:'/Vue/Ch08'},
          {text:'關於生命週期', link:'/Vue/Ch09'},
          {text:'Function 模組化', link:'/Vue/Ch10'},
          {text:'Route', link:'/Vue/Ch11'},
        ]
      },
      {
        text:'C#',
        collapsed:true,
      },
      {
        text: 'SQL',
        collapsed: true,
          items: [
            { text: 'SQL概述', link: '/SQL/basic' },
            { text: 'JOIN', link: '/SQL/join' },
            { text: 'char  / varchar /  nvarvchar', link: '/SQL/char' },
            { text: '子查詢', link: '/SQL/subquery' },

          ]
      },
      {
        text:'Dapper',
        collapsed:true,
        items:[
          {text:'Dapper',link:'../ORM/dapper/'}
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
   lastUpdatedText:"最後更新",
   footer:{
    message:"Released under the MIT License",
    copyright:"Copyright © 2024 Tino"
   }
  },
  lastUpdated:true,
})
