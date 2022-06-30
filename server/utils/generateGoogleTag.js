import { SEO_INDEX } from '../../src/config/server.config';

export function generateGoogleTag(iframe = false) {
  const gtag = SEO_INDEX ? 'GTM-54D4Q8' : 'GTM-NL7QRMG';
  const dateNow = new Date();
  const fullDate = `${dateNow.getYear()}-${dateNow.getMonth()}-${dateNow.getDay()}`;

  if (iframe) {
    return `
      <!-- Google Tag Manager (noscript) by SSR [${SEO_INDEX ? 'Production' : 'Develop'}] -->
      <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=${gtag}" height="0" width="0" style="display:none;visibility:hidden"></iframe>
      </noscript>
      <!-- End Google Tag Manager (noscript) -->
      `;
  } else {
    return `
      <meta name="p:domain_verify" content="b09397328a05958cc39004a51b2b8074"/>
      <!--<script charset="UTF-8" src="//cdn.sendpulse.com/js/push/7ae68901fe6e3fc0025fbf0136a3121d_1.js" async="true"></script>-->
      <!-- Google Tag Manager by SSR [${SEO_INDEX ? 'Production' : 'Develop'}] -->
      <script>
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer', '${gtag}');
      </script>
      <!-- End Google Tag Manager -->
      `;
  }
}
