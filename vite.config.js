import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  const isDev = command === 'serve';
  
  const {
    VITE_TITLE,
    VITE_KEYWORDS,
    VITE_DESCRIPTION,
    VITE_COPYRIGHT,
    VITE_URL,
  } = loadEnv('all', process.cwd());

  const injectGACode = () => {
    const domains = {
      'www.businesstoday.com.tw': 'G-E8H9YJZQJP',
      'events.businesstoday.com.tw': 'G-E8QKRYXRLQ',
      'esg.businesstoday.com.tw': 'G-SB7EH4Y2DY'
    };
    const target = Object.keys(domains).find(key => VITE_URL.includes(key));
    if (target) {
      return `
        <script async src="https://www.googletagmanager.com/gtag/js?id=${domains[target]}"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${domains[target]}');
        </script>`;
    } else {
      console.error('未知domain name', VITE_URL);
      return '';
    }
  }

  const isEvent = VITE_URL.includes('events.businesstoday.com.tw')

  const injectGTMCode = () => {
    // 目前活動頁僅有event子網域需要安裝gtm
    return isEvent ? `
      <!-- Google Tag Manager -->
      <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-N8FFXWM');</script>
      <!-- End Google Tag Manager -->` : '';
  }

  return {
    base: isDev ? '/' : './',
    plugins: [
      vue(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            injectScript: isDev ? '' :
            `
            ${injectGACode()}
            ${injectGTMCode()}
            `,
            meta: {
              title: VITE_TITLE,
              keywords: VITE_KEYWORDS,
              description: VITE_DESCRIPTION,
              copyright: VITE_COPYRIGHT,
              url: VITE_URL,
            },
            injectHtml: !isDev && isEvent ? `
              <!-- Google Tag Manager (noscript) -->
              <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N8FFXWM"
              height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
              <!-- End Google Tag Manager (noscript) -->
              ` : ''
          }
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})