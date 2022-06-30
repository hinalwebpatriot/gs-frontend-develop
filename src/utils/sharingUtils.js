import qs from 'qs';
import clientConfig from '../config/client.config';
/*
 More links:
 https://github.com/bradvin/social-share-urls
*/

export function openSocialWindow({ height = '570px', width = '520px', url }) {
  if (!url) {
    return;
  }

  window.open(url, '_blank', `height=${height},width=${width}`);
}

export function telegramShareUrl({ url, title, phoneNumber }) {
  // https://t.me/share/url?url={url}&text={title}&to={phone_number}
  return `https://t.me/share/url?${qs.stringify({
    url: url,
    text: title,
    phone_number: phoneNumber
  })}`;
}

export function whatsAppShareUrl({ url, title }) {
  // https://wa.me/?text=urlencodedtext
  return `https://wa.me/?${qs.stringify({ text: `${title} \n Link: ${url}` })}`;
}

export function skypeActionUrl({ profile, action = 'chat' }) {
  /*
    Allowed actions:
      voicemail
      sendfile
      add
      userinfo
      chat
      call
      videocall (call&amp;video=true)
   */

  if (action === 'videocall') {
    return `skype:${profile}?call&amp;video=true`;
  }

  return `skype:${profile}?${action}`;
}

export function viberActionUrl({ profile = '', isMobile }) {
  /*
    Info: http://developers.viber.com/docs/tools/deep-links
    Allowed types:
      landing -> viber.me/<URI>  Link to Public Account landing page
      chat -> viber://pa?chatURI=<URI> Link to direct 1on1 chat
   */
  // return `https://viber.me/${profile}`;
  //+380932856338+380932856338
  // const phone = '61451181294'
  // console.log(profile)
  //viber://pa?chatURI=380932856338
  // return `viber://pa?chatURI=${phone}`;
  return isMobile ? `viber://add?number=${profile.replace(/\+/g, '')}` : `viber://chat?number=${profile}`;
}

export function telegramChatUrl({ profile = '' }) {
  return `https://t.me/${profile}`;
}

export function whatsAppChatUrl({ profile = '' }) {
  return `https://wa.me/${profile.replace(/[+\-()\s]/g, '')}`;
}

export function facebookShareUrl({ url }) {
  return `https://www.facebook.com/sharer.php?${qs.stringify({ u: url })}`;
}

export function pinterestShareUrl({ url, description }) {
  return `http://pinterest.com/pin/create/button/?${qs.stringify({
    url,
    description
  })}`;
}

export function messengerShareUrl({ url }) {
  return `fb-messenger://share?${qs.stringify({
    link: url,
    app_id: clientConfig.facebook.appId
  })}`;
}

export function contactByMessengerUrl() {
  return `https://m.me/${clientConfig.facebook.page}`;
}
