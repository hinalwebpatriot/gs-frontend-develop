import express from "express";
import bodyParser from "body-parser";

import routing from "../../src/config/routing";
import blogController from "../controllers/pages/blogController";
import renderMiddleware from "../middlewares/renderMiddleware";
import createStoreMiddleware from "../middlewares/createStoreMiddleware";
import anyPageController from "../controllers/pages/anyPageController";
import blogTagController from "../controllers/pages/blogTagController";
import blogArticleController from "../controllers/pages/blogArticleController";
import engagementFeedController from "../controllers/pages/engagementFeedController";
import catalogFeedController from "../controllers/pages/catalogFeedController";
import catalogProductController from "../controllers/pages/catalogProductController";
import catalogProductReviewsController from "../controllers/pages/catalogProductReviewsController";
import weddingFeedController from "../controllers/pages/weddingFeedController";
import diamondsFeedController from "../controllers/pages/diamondsFeedController";
import engagementProductController from "../controllers/pages/engagementProductController";
import weddingProductController from "../controllers/pages/weddingProductController";
import staticPageController from "../controllers/pages/staticPageController";
import mainPageController from "../controllers/pages/mainPageController";
import reviewsController from "../controllers/pages/reviewsController";
import weddingProductReviewsController from "../controllers/pages/weddingProductReviewsController";
import engagementProductReviewsController from "../controllers/pages/engagementProductReviewsController";
import redirectWithSlash from "../utils/slashRedirect";
import deviceDetectorMiddleware from "../middlewares/deviceDetectorMiddleware";
import acceptCookieController from "../controllers/acceptCookieController";
import noSlashRedirect from '../utils/noSlashRedirect';
import notFoundPageController from '../controllers/pages/notFoundPageController';
import sendFirstChunkMiddleware from '../middlewares/sendFirstChunkMiddleware';
import salePageController from '../controllers/pages/dynamic/salePageController';
import bestSellersPageController from '../controllers/pages/dynamic/bestSellersPageController';
import landingPageController from '../controllers/pages/landingPageContoller';
import axiosConfigMiddleware from '../middlewares/axiosConfigMiddleware';
import caseRedirect from '../utils/caseRedirect';
import checkUrlParamsMiddleware from '../middlewares/checkUrlParamsMiddleware';
import altMainPageController from "../controllers/pages/altMainPageController";
import paymentSuccessController from "../controllers/pages/paymentSuccessController";
import checkSeoRedirects from "../middlewares/checkSeoRedirects";
import cityDetectorMiddleware from "../middlewares/cityDetectorMiddleware";

const router = express.Router({
  strict: true,
  // caseSensitive: true
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.use(checkSeoRedirects);
router.use(checkUrlParamsMiddleware);
router.use(axiosConfigMiddleware);
router.use(createStoreMiddleware);
router.use(deviceDetectorMiddleware);
router.use(cityDetectorMiddleware);
router.use(renderMiddleware);
router.use(sendFirstChunkMiddleware);

router.post("/express/api/accept-cookie", acceptCookieController);

// Reviews
router.get(routing().reviews.slice(0, -1), redirectWithSlash);
router.get(routing().reviews, caseRedirect, reviewsController);
router.get(routing().engagementProductReview + '/', noSlashRedirect);
router.get(routing().engagementProductReview, caseRedirect, engagementProductReviewsController);
router.get(routing().weddingProductReview + '/', noSlashRedirect);
router.get(routing().weddingProductReview, caseRedirect, weddingProductReviewsController);
router.get(routing().catalogProductReview + '/', noSlashRedirect);
router.get(routing().catalogProductReview, caseRedirect, catalogProductReviewsController);

// Blog
router.get(routing().blog.slice(0, -1), redirectWithSlash);
router.get(routing().blog, caseRedirect, blogController);
router.get(routing().blogTag + '/', noSlashRedirect);
router.get(routing().blogTag, caseRedirect, blogTagController);
router.get(routing().blogArticle + '/', noSlashRedirect);
router.get(routing().blogArticle, caseRedirect, blogArticleController);

// Diamonds
router.get(routing().diamondsFeed.slice(0, -1), redirectWithSlash);
router.get(routing().diamondsFeed, caseRedirect, diamondsFeedController);
router.get(routing().diamondsFeedWithShape + '/', noSlashRedirect);
router.get(routing().diamondsFeedWithShape, caseRedirect, diamondsFeedController);
router.get('/brisbane' + routing().diamondsFeed.slice(0, -1), redirectWithSlash);
router.get('/brisbane' + routing().diamondsFeed, caseRedirect, diamondsFeedController);
router.get('/brisbane' + routing().diamondsFeedWithShape + '/', noSlashRedirect);
router.get('/brisbane' + routing().diamondsFeedWithShape, caseRedirect, diamondsFeedController);

router.get('/melbourne' + routing().diamondsFeed.slice(0, -1), redirectWithSlash);
router.get('/melbourne' + routing().diamondsFeed, caseRedirect, diamondsFeedController);
router.get('/melbourne' + routing().diamondsFeedWithShape + '/', noSlashRedirect);
router.get('/melbourne' + routing().diamondsFeedWithShape, caseRedirect, diamondsFeedController);

router.get('/perth' + routing().diamondsFeed.slice(0, -1), redirectWithSlash);
router.get('/perth' + routing().diamondsFeed, caseRedirect, diamondsFeedController);
router.get('/perth' + routing().diamondsFeedWithShape + '/', noSlashRedirect);
router.get('/perth' + routing().diamondsFeedWithShape, caseRedirect, diamondsFeedController);

router.get('/adelaide' + routing().diamondsFeed.slice(0, -1), redirectWithSlash);
router.get('/adelaide' + routing().diamondsFeed, caseRedirect, diamondsFeedController);
router.get('/adelaide' + routing().diamondsFeedWithShape + '/', noSlashRedirect);
router.get('/adelaide' + routing().diamondsFeedWithShape, caseRedirect, diamondsFeedController);

router.get('/canberra' + routing().diamondsFeed.slice(0, -1), redirectWithSlash);
router.get('/canberra' + routing().diamondsFeed, caseRedirect, diamondsFeedController);
router.get('/canberra' + routing().diamondsFeedWithShape + '/', noSlashRedirect);
router.get('/canberra' + routing().diamondsFeedWithShape, caseRedirect, diamondsFeedController);

// TODO: End of query redirect proceeded

// Catalog
// router.get(routing().catalogFeed.slice(0, -1), redirectWithSlash);
router.get(routing().catalogFeed, catalogFeedController);
router.get(routing().catalogFeedPagination, caseRedirect, catalogFeedController);
router.get(routing().catalogFeedWithFilter + '/', noSlashRedirect);
router.get(routing().catalogFeedWithFilter, caseRedirect, catalogFeedController);
router.get(routing().catalogFeedWithFilterPagination, caseRedirect, catalogFeedController);
router.get('/brisbane' + routing().catalogFeed, catalogFeedController);
router.get('/brisbane' + routing().catalogFeedPagination, caseRedirect, catalogFeedController);
router.get('/brisbane' + routing().catalogFeedWithFilter + '/', noSlashRedirect);
router.get('/brisbane' + routing().catalogFeedWithFilter, caseRedirect, catalogFeedController);
router.get('/brisbane' + routing().catalogFeedWithFilterPagination, caseRedirect, catalogFeedController);

router.get('/melbourne' + routing().catalogFeed, catalogFeedController);
router.get('/melbourne' + routing().catalogFeedPagination, caseRedirect, catalogFeedController);
router.get('/melbourne' + routing().catalogFeedWithFilter + '/', noSlashRedirect);
router.get('/melbourne' + routing().catalogFeedWithFilter, caseRedirect, catalogFeedController);
router.get('/melbourne' + routing().catalogFeedWithFilterPagination, caseRedirect, catalogFeedController);

router.get('/perth' + routing().catalogFeed, catalogFeedController);
router.get('/perth' + routing().catalogFeedPagination, caseRedirect, catalogFeedController);
router.get('/perth' + routing().catalogFeedWithFilter + '/', noSlashRedirect);
router.get('/perth' + routing().catalogFeedWithFilter, caseRedirect, catalogFeedController);
router.get('/perth' + routing().catalogFeedWithFilterPagination, caseRedirect, catalogFeedController);

router.get('/adelaide' + routing().catalogFeed, catalogFeedController);
router.get('/adelaide' + routing().catalogFeedPagination, caseRedirect, catalogFeedController);
router.get('/adelaide' + routing().catalogFeedWithFilter + '/', noSlashRedirect);
router.get('/adelaide' + routing().catalogFeedWithFilter, caseRedirect, catalogFeedController);
router.get('/adelaide' + routing().catalogFeedWithFilterPagination, caseRedirect, catalogFeedController);

router.get('/canberra' + routing().catalogFeed, catalogFeedController);
router.get('/canberra' + routing().catalogFeedPagination, caseRedirect, catalogFeedController);
router.get('/canberra' + routing().catalogFeedWithFilter + '/', noSlashRedirect);
router.get('/canberra' + routing().catalogFeedWithFilter, caseRedirect, catalogFeedController);
router.get('/canberra' + routing().catalogFeedWithFilterPagination, caseRedirect, catalogFeedController);

router.get(routing().catalogProduct + '/', noSlashRedirect);
router.get(routing().catalogProduct, catalogProductController);

// Engagement
router.get(routing().engagementFeed.slice(0, -1), redirectWithSlash);
router.get(routing().engagementFeed, caseRedirect, engagementFeedController);
router.get(routing().engagementFeedPagination, caseRedirect, engagementFeedController);
router.get(routing().engagementFeedWithFilter + '/', noSlashRedirect);
router.get(routing().engagementFeedWithFilter, caseRedirect, engagementFeedController);
router.get(routing().engagementFeedWithFilterPagination, caseRedirect, engagementFeedController);
router.get('/brisbane' + routing().engagementFeed.slice(0, -1), redirectWithSlash);
router.get('/brisbane' + routing().engagementFeed, caseRedirect, engagementFeedController);
router.get('/brisbane' + routing().engagementFeedPagination, caseRedirect, engagementFeedController);
router.get('/brisbane' + routing().engagementFeedWithFilter + '/', noSlashRedirect);
router.get('/brisbane' + routing().engagementFeedWithFilter, caseRedirect, engagementFeedController);
router.get('/brisbane' + routing().engagementFeedWithFilterPagination, caseRedirect, engagementFeedController);

router.get('/melbourne' + routing().engagementFeed.slice(0, -1), redirectWithSlash);
router.get('/melbourne' + routing().engagementFeed, caseRedirect, engagementFeedController);
router.get('/melbourne' + routing().engagementFeedPagination, caseRedirect, engagementFeedController);
router.get('/melbourne' + routing().engagementFeedWithFilter + '/', noSlashRedirect);
router.get('/melbourne' + routing().engagementFeedWithFilter, caseRedirect, engagementFeedController);
router.get('/melbourne' + routing().engagementFeedWithFilterPagination, caseRedirect, engagementFeedController);

router.get('/perth' + routing().engagementFeed.slice(0, -1), redirectWithSlash);
router.get('/perth' + routing().engagementFeed, caseRedirect, engagementFeedController);
router.get('/perth' + routing().engagementFeedPagination, caseRedirect, engagementFeedController);
router.get('/perth' + routing().engagementFeedWithFilter + '/', noSlashRedirect);
router.get('/perth' + routing().engagementFeedWithFilter, caseRedirect, engagementFeedController);
router.get('/perth' + routing().engagementFeedWithFilterPagination, caseRedirect, engagementFeedController);

router.get('/adelaide' + routing().engagementFeed.slice(0, -1), redirectWithSlash);
router.get('/adelaide' + routing().engagementFeed, caseRedirect, engagementFeedController);
router.get('/adelaide' + routing().engagementFeedPagination, caseRedirect, engagementFeedController);
router.get('/adelaide' + routing().engagementFeedWithFilter + '/', noSlashRedirect);
router.get('/adelaide' + routing().engagementFeedWithFilter, caseRedirect, engagementFeedController);
router.get('/adelaide' + routing().engagementFeedWithFilterPagination, caseRedirect, engagementFeedController);

router.get('/canberra' + routing().engagementFeed.slice(0, -1), redirectWithSlash);
router.get('/canberra' + routing().engagementFeed, caseRedirect, engagementFeedController);
router.get('/canberra' + routing().engagementFeedPagination, caseRedirect, engagementFeedController);
router.get('/canberra' + routing().engagementFeedWithFilter + '/', noSlashRedirect);
router.get('/canberra' + routing().engagementFeedWithFilter, caseRedirect, engagementFeedController);
router.get('/canberra' + routing().engagementFeedWithFilterPagination, caseRedirect, engagementFeedController);

router.get(routing().engagementProduct + '/', noSlashRedirect);
router.get(routing().engagementProduct, engagementProductController);

// Wedding
router.get(routing().weddingFeed.slice(0, -1), redirectWithSlash);
router.get(routing().weddingFeed, caseRedirect, weddingFeedController);
router.get(routing().weddingFeedPagination, caseRedirect, weddingFeedController);
router.get(routing().weddingFeedWithFilter + '/', noSlashRedirect);
router.get(routing().weddingFeedWithFilter, caseRedirect, weddingFeedController);
router.get(routing().weddingFeedWithFilterPagination, caseRedirect, weddingFeedController);
router.get(routing().weddingFeedWithGenderFilter + '/', noSlashRedirect);
router.get(routing().weddingFeedWithGenderFilter, caseRedirect, weddingFeedController);
router.get(routing().weddingFeedWithGenderFilterPagination, caseRedirect, weddingFeedController);
router.get('/brisbane' + routing().weddingFeed.slice(0, -1), redirectWithSlash);
router.get('/brisbane' + routing().weddingFeed, caseRedirect, weddingFeedController);
router.get('/brisbane' + routing().weddingFeedPagination, caseRedirect, weddingFeedController);
router.get('/brisbane' + routing().weddingFeedWithFilter + '/', noSlashRedirect);
router.get('/brisbane' + routing().weddingFeedWithFilter, caseRedirect, weddingFeedController);
router.get('/brisbane' + routing().weddingFeedWithFilterPagination, caseRedirect, weddingFeedController);
router.get('/brisbane' + routing().weddingFeedWithGenderFilter + '/', noSlashRedirect);
router.get('/brisbane' + routing().weddingFeedWithGenderFilter, caseRedirect, weddingFeedController);
router.get('/brisbane' + routing().weddingFeedWithGenderFilterPagination, caseRedirect, weddingFeedController);

router.get('/melbourne' + routing().weddingFeed.slice(0, -1), redirectWithSlash);
router.get('/melbourne' + routing().weddingFeed, caseRedirect, weddingFeedController);
router.get('/melbourne' + routing().weddingFeedPagination, caseRedirect, weddingFeedController);
router.get('/melbourne' + routing().weddingFeedWithFilter + '/', noSlashRedirect);
router.get('/melbourne' + routing().weddingFeedWithFilter, caseRedirect, weddingFeedController);
router.get('/melbourne' + routing().weddingFeedWithFilterPagination, caseRedirect, weddingFeedController);
router.get('/melbourne' + routing().weddingFeedWithGenderFilter + '/', noSlashRedirect);
router.get('/melbourne' + routing().weddingFeedWithGenderFilter, caseRedirect, weddingFeedController);
router.get('/melbourne' + routing().weddingFeedWithGenderFilterPagination, caseRedirect, weddingFeedController);

router.get('/perth' + routing().weddingFeed.slice(0, -1), redirectWithSlash);
router.get('/perth' + routing().weddingFeed, caseRedirect, weddingFeedController);
router.get('/perth' + routing().weddingFeedPagination, caseRedirect, weddingFeedController);
router.get('/perth' + routing().weddingFeedWithFilter + '/', noSlashRedirect);
router.get('/perth' + routing().weddingFeedWithFilter, caseRedirect, weddingFeedController);
router.get('/perth' + routing().weddingFeedWithFilterPagination, caseRedirect, weddingFeedController);
router.get('/perth' + routing().weddingFeedWithGenderFilter + '/', noSlashRedirect);
router.get('/perth' + routing().weddingFeedWithGenderFilter, caseRedirect, weddingFeedController);
router.get('/perth' + routing().weddingFeedWithGenderFilterPagination, caseRedirect, weddingFeedController);

router.get('/adelaide' + routing().weddingFeed.slice(0, -1), redirectWithSlash);
router.get('/adelaide' + routing().weddingFeed, caseRedirect, weddingFeedController);
router.get('/adelaide' + routing().weddingFeedPagination, caseRedirect, weddingFeedController);
router.get('/adelaide' + routing().weddingFeedWithFilter + '/', noSlashRedirect);
router.get('/adelaide' + routing().weddingFeedWithFilter, caseRedirect, weddingFeedController);
router.get('/adelaide' + routing().weddingFeedWithFilterPagination, caseRedirect, weddingFeedController);
router.get('/adelaide' + routing().weddingFeedWithGenderFilter + '/', noSlashRedirect);
router.get('/adelaide' + routing().weddingFeedWithGenderFilter, caseRedirect, weddingFeedController);
router.get('/adelaide' + routing().weddingFeedWithGenderFilterPagination, caseRedirect, weddingFeedController);

router.get('/canberra' + routing().weddingFeed.slice(0, -1), redirectWithSlash);
router.get('/canberra' + routing().weddingFeed, caseRedirect, weddingFeedController);
router.get('/canberra' + routing().weddingFeedPagination, caseRedirect, weddingFeedController);
router.get('/canberra' + routing().weddingFeedWithFilter + '/', noSlashRedirect);
router.get('/canberra' + routing().weddingFeedWithFilter, caseRedirect, weddingFeedController);
router.get('/canberra' + routing().weddingFeedWithFilterPagination, caseRedirect, weddingFeedController);
router.get('/canberra' + routing().weddingFeedWithGenderFilter + '/', noSlashRedirect);
router.get('/canberra' + routing().weddingFeedWithGenderFilter, caseRedirect, weddingFeedController);
router.get('/canberra' + routing().weddingFeedWithGenderFilterPagination, caseRedirect, weddingFeedController);

router.get(routing().weddingProduct + '/', noSlashRedirect);
router.get(routing().weddingProduct, weddingProductController);

//Routes moved from  src/components/App.jsx after change route('*') for anyPageController
router.get(routing().completedRings, noSlashRedirect);
router.get(routing().completedRings.substring(0, -1), anyPageController);
router.get(routing().changePassword, anyPageController);
router.get(routing().confirmEmail, anyPageController);
router.get(routing().search, anyPageController);
router.get(routing().completedRingsShare, anyPageController);
router.get(routing().favoriteTab, anyPageController);
router.get(routing().favoriteShare, anyPageController);
router.get(routing().compareTab, anyPageController);
router.get(routing().compareShare, anyPageController);
router.get(routing().diamondProduct + '/', noSlashRedirect);
router.get(routing().diamondProduct, caseRedirect, anyPageController);
router.get(routing().cart, anyPageController);
router.get(routing().delivery, anyPageController);
router.get(routing().order, anyPageController);
router.get(routing().paymentSuccess, paymentSuccessController);
router.get(routing().paymentFailure, anyPageController);

// Static && Dynamic
// Explicit links that looks like static page but they shouldn't render

router.get(routing().favorite, caseRedirect, anyPageController);
router.get(routing().compare, caseRedirect, anyPageController);

//router.get(routing().staticPage + '/', noSlashRedirect);

router.get(routing().sale, caseRedirect, salePageController);
router.get(routing().bestSellers, caseRedirect, bestSellersPageController);

router.get(routing().jewelleryFeed, caseRedirect, anyPageController);
router.get('/brisbane' + routing().jewelleryFeed, caseRedirect, anyPageController);
router.get('/melbourne' + routing().jewelleryFeed, caseRedirect, anyPageController);
router.get('/perth' + routing().jewelleryFeed, caseRedirect, anyPageController);
router.get('/adelaide' + routing().jewelleryFeed, caseRedirect, anyPageController);
router.get('/canberra' + routing().jewelleryFeed, caseRedirect, anyPageController);
router.get(routing().contactUs, caseRedirect, anyPageController);
router.get(routing().faq, caseRedirect, anyPageController);

router.get(routing().landing, caseRedirect, landingPageController);

router.get('/brisbane', redirectWithSlash);
router.get('/brisbane/', mainPageController);
router.get('/melbourne', redirectWithSlash);
router.get('/melbourne/', mainPageController);
router.get('/perth', redirectWithSlash);
router.get('/perth/', mainPageController);
router.get('/adelaide', redirectWithSlash);
router.get('/adelaide/', mainPageController);
router.get('/canberra', redirectWithSlash);
router.get('/canberra/', mainPageController);
router.get(routing().staticPage + '/', staticPageController);
router.get(routing().staticPage, staticPageController);
router.get(routing().root, mainPageController);
//router.get(routing().main2, altMainPageController);

//router.get(routing().notFound, caseRedirect, notFoundPageController);

router.get("*", notFoundPageController);

module.exports = router;
