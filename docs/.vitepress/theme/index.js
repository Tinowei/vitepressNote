import DefaultTheme from 'vitepress/theme';
import MyCard from '../components/Card.vue';
import MyProfile from '../components/ProfileCard.vue';

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
      app.component('MyCard', MyCard);
      app.component('MyProfile',MyProfile);
    }
  };