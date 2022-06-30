export function openHubspotChat() {
  try {
    if (window.HubSpotConversations && window.HubSpotConversations.widget && 
      window.HubSpotConversations.widget.status() && window.HubSpotConversations.widget.status().loaded) {
        
        window.HubSpotConversations.widget.open();
    } else {
      insertHubspotChat();
      setTimeout(() => {
        window.hsConversationsOnReady = [() => {
          window.HubSpotConversations.widget.open()
        }];
      }, 0);
    }
  } catch (e) {
    console.log('Hubspot loading')
  }
}

export function insertHubspotChat() {
  const script = document.createElement('script');
  script.id = "hs-script-loader"
  script.async = true;
  script.defer = true;
  // script.setAttribute('async', true);
  // script.setAttribute('defer', true);
  script.src = '//js.hs-scripts.com/4204377.js'

  document.body.insertAdjacentElement('beforeEnd', script);
}

export const hubspotBookingLink = 'https://www.gsdiamonds.com.au/appointments'
// export const parramattaBookingLink = 'https://www.gsdiamonds.com.au/appointments'

// <!-- Start of HubSpot Embed Code -->
// <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/5743507.js"></script>
// <!-- End of HubSpot Embed Code -->
