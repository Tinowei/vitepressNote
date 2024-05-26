import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Tino's Notes",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '🏠 Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' },
      { text: 'JavaScript', link: '/Javascript/javascript' },
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
        text:'ORM',
        collapsed:true,
        items:[
          {text:'Dapper',link:'/ORM/dapper/'}
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
