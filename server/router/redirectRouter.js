import express from "express";
import routing from "../../src/config/routing";
import caseRedirect from '../utils/caseRedirect';

const router = express.Router({
  strict: true
});

router.get('/contact/', (req, res) => res.redirect(301, routing().contactUs));
router.get('/blog/Free-Shipping-from-GSDiamonds', (req, res) => res.redirect(301, routing().moneyBack));
router.get('/diamonds/help-me-choose', (req, res) => res.redirect(301, routing().helpMeChoose));
router.get('/diamonds/product/none/*', (req, res) => res.redirect(301, routing().engagementFeed));

router.get('/education/30-day-guarantee.html', (req, res) => res.redirect(301, routing().moneyBack));
router.get('/education/customer-reviews.html', (req, res) => res.redirect(301, routing().reviews));
router.get('/education/faqs.html', (req, res) => res.redirect(301, routing().faq));
router.get('/education/privacy.html', (req, res) => res.redirect(301, routing().privacyPolicy));
router.get('/education/terms.html', (req, res) => res.redirect(301, routing().terms));
// router.get('/google4dbcd86619da9a6a.html', (req, res) => res.redirect(301, routing().googleSiteVerification));

router.get('/jewellery/gifts', (req, res) => res.redirect(301, routing().giftIdeas));
// router.get('/jewellery/*', (req, res) => res.redirect(301, routing().jewelleryFeed));

router.get('/wedding-rings/womens/classic-brands', (req, res) => res.redirect(301, routing('womens').weddingFeedWithFilter));
router.get('/wedding-rings/womens/diamond-brands', (req, res) => res.redirect(301, routing('womens').weddingFeedWithFilter));
router.get('/wedding-rings/womens/platinum', (req, res) => res.redirect(301, routing('womens').weddingFeedWithFilter));
router.get('/wedding-rings/womens/rose-gold', (req, res) => res.redirect(301, routing('womens').weddingFeedWithFilter));
router.get('/wedding-rings/womens/white-gold', (req, res) => res.redirect(301, routing('womens').weddingFeedWithFilter));
router.get('/wedding-rings/womens/yellow-gold', (req, res) => res.redirect(301, routing('womens').weddingFeedWithFilter));

router.get('/education/:slug\.html', (req, res) => res.redirect(301, routing(req.params.slug).staticPage));
router.get('/:slug\.*', (req, res) => res.redirect(301, routing(req.params.slug).staticPage));

module.exports = router;
