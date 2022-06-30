import React from "react";
import { successPaymentWorker } from "../../../src/components/Checkout/Payment/PaymentActions";

export default (req, res) => {
    console.log('paymentSuccessController');
    res.sendFirstChunk();

    const settings = {
        locale: req.locale,
        orderId: req.query.id,
        token: req.query.token
    };

    res.tracker.mark('API', 'start');
    res.store.runSaga(successPaymentWorker, settings).done.then(() => {
        if (settings.orderData && settings.orderData.order_type !== 'service') {
            addFooterScripts(res, settings.orderData)
        }

        res.render();
    });
};

function addFooterScripts(res, order)
{
    let orderData = order.order_info.Shared;
    let products = order.products_list;
    let country = order.order_info.Office.country.slice(0, 2).toString().toUpperCase();

    let items = [];

    for (let key in products) {
        items.push({brand: 'gsdiamonds'});
        items.push({product: products[key].title});
    }

    let date = new Date();
    date.setDate(date.getDate() + 7);

    let day = date.getDate();
    if (day < 10) {
        day = '0' + day;
    }

    let month = date.getMonth() + 1;
    if (month < 10) {
        month = '0' + month
    }

    let deliveryDate = `${date.getFullYear()}-${month}-${day}`;


    res.footerCodes = `
        <!-- BEGIN GCR Opt-in Module Code -->

        <script src="https://apis.google.com/js/platform.js?onload=renderOptIn" async defer></script>
        <script>
          window.renderOptIn = function() {
            window.gapi.load('surveyoptin', function() {
              window.gapi.surveyoptin.render(
                {
                  // REQUIRED FIELDS
                  "merchant_id": 137104105,
                  "order_id": ${orderData.id},
                  "email": "gsdiamondsau@gmail.com",
                  "delivery_country": "${country}",
                  "estimated_delivery_date": "${deliveryDate}",
                  "products": ${JSON.stringify(items)}
                });
            });
          }
        </script>
        <!-- END GCR Opt-in Module Code -->`;
}