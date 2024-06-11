import DefaultTheme from 'vitepress/theme';
import MyCard from '../components/Card.vue';

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
      app.component('MyCard', MyCard);
    }
  };