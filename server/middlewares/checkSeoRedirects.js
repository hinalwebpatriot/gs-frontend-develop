import axios from "axios";
import { API_URL } from "../../src/config/server.config";

export default (req, res, next) => {
    console.log('checkSeoRedirects.js');

    let skipUris = ['static', 'auth', 'checkout', 'compare', 'favorite', 'search', 'cookies'];
    let firstFragment = req.path.toString().split('/')[1];

    console.log('firstFragment = ' + firstFragment);

    if (req.path !== '/' && !skipUris.includes(firstFragment)) {
        console.log('try redirect from: ' + req.path);
        let startTime = Date.now();

        axios.post(`${API_URL}/api/seo/fetch-redirect`, {
            'url': req.path,
        })
        .then(response => {
            console.log('TIME FETCH REDIRECT ' + ((Date.now() - startTime) / 1000) + ' sec.');

            if (response.data.redirect_url) {
                res.redirect(301, response.data.redirect_url);
            } else {
                next();
            }
        })
        .catch(err => {
            res.status(500);
            res.send("Internal error");
            next();
        });
    } else {
        next();
    }
};
