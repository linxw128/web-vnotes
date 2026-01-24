import type { App } from 'vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '../layouts/router';
// import i18nPlugin from 'my-vue-i18n-plugin';

export default (app: App) => {
  app.use(ElementPlus);
  app.use(router);
};

