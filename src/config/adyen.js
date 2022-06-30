export function insertAdyen() {
    const script = document.createElement('script');
    script.id = "adyen-script-loader"
    script.async = true;
    script.defer = true;

    if (process.env.NODE_ENV === 'production') {
      script.src = '/lib/js/adyen.encrypt.js'
    } else {
      script.src = 'http://localhost:3010/lib/js/adyen.encrypt.js'
    }

    // script.onload = success;
    // script.onerror = failure;
    document.body.insertAdjacentElement('beforeEnd', script);
}

export function removeAdyen() {
  const script = document.getElementById('adyen-script-loader');

  if (script) {
    document.body.removeChild(script);
    delete window.adyen;
  }
}
