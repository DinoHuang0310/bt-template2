import { ref } from 'vue';
import api from '../services/api';

const info = ref({})

export default () => {
  const isDev = import.meta.env.DEV;

  const getInfo = () => {
    api.get(`${isDev ? '' : '.'}/infoData.json?${new Date().getTime()}`).then((response) => {
      if (typeof response === 'object') {
        info.value = response;
      } else {
        alert('取得內容錯誤')
        console.error(response);
      }

    }).catch((error) => {
      alert('取得內容失敗')
      console.error(error)
    })
  }

  return {
    info,
    getInfo
  }
}