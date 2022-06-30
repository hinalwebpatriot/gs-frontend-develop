import React from "react";
import { Switch } from "react-router-dom";
import loadable from "@loadable/component";
import configRouting from "../config/routing";
import WrappedRoute from "./Routes/WrappedRoute";
import CheckoutRoute from "./Routes/CheckoutRoute";
import CheckoutServicesRoute from "./Routes/CheckoutServicesRoute";
import { PreloaderComponent } from "./_common/Preloader";
import ErrorBoundary from "./_common/ErrorBoundary/ErrorBoundary";

const DiamondPage = loadable(
  () =>
    import(/* webpackChunkName: 'diamonds_product'*/ "./Product/Diamond/DiamondPage"),
  { fallback: <PreloaderComponent /> }
);

const BlogPage = loadable(
  () => import(/* webpackChunkName: 'blog'*/ "./Blog/BlogPage"),
  { fallback: <PreloaderComponent /> }
);

const BlogTagPage = loadable(
  () => import(/* webpackChunkName: 'blog_tag'*/ "./Blog/BlogTagPage"),
  { fallback: <PreloaderComponent /> }
);

const BlogArticlePage = loadable(
  () => import(/* webpackChunkName: 'blog_article'*/ "./Blog/BlogArticlePage"),
  { fallback: <PreloaderComponent /> }
);

const ConfirmEmail = loadable(
  () =>
    import(/* webpackChunkName: 'confirm_email'*/ "./Auth/Login/ConfirmEmail/ConfirmEmail"),
  { fallback: <PreloaderComponent /> }
);

const EngagementPage = loadable(
  () =>
    import(/* webpackChunkName: 'engagement_product'*/ "./Product/Engagement/EngagementPage"),
  { fallback: <PreloaderComponent /> }
);

const WeddingPage = loadable(
  () =>
    import(/* webpackChunkName: 'wedding_product'*/ "./Product/Wedding/WeddingPage"),
  { fallback: <PreloaderComponent /> }
);

const FavoritePage = loadable(
  () => import(/* webpackChunkName: 'favorite'*/ "./Favorite/FavoritePage"),
  { fallback: <PreloaderComponent /> }
);

const ComparePage = loadable(
  () => import(/* webpackChunkName: 'compare'*/ "./Compare/ComparePage"),
  { fallback: <PreloaderComponent /> }
);

const SearchFullPage = loadable(
  () =>
    import(/* webpackChunkName: 'search_full'*/ "./Search/Full/SearchFullPage"),
  { fallback: <PreloaderComponent /> }
);

const CompletedRingsPage = loadable(
  () =>
    import(/* webpackChunkName: 'completed_rings'*/ "./CompletedRings/CompletedRingsPage"),
  { fallback: <PreloaderComponent /> }
);

const ReferralPage = loadable(
  () =>
    import(/* webpackChunkName: 'completed_rings'*/ "./Referral/ReferralPage"),
  { fallback: <PreloaderComponent /> }
);

const EngagementReviewsPage = loadable(
  () =>
    import(/* webpackChunkName: 'engagement_reviews'*/ "./Reviews/FullProduct/EngagementReviewsPage"),
  { fallback: <PreloaderComponent /> }
);

const WeddingReviewsPage = loadable(
  () =>
    import(/* webpackChunkName: 'wedding_reviews'*/ "./Reviews/FullProduct/WeddingReviewsPage"),
  { fallback: <PreloaderComponent /> }
);

const ReviewsPage = loadable(
  () =>
    import(/* webpackChunkName: 'reviews'*/ "./Reviews/Category/ReviewsPage"),
  { fallback: <PreloaderComponent /> }
);

const FavoriteSharePage = loadable(
  () =>
    import(/* webpackChunkName: 'favorite_share'*/ "./Favorite/Share/FavoriteSharePage"),
  { fallback: <PreloaderComponent /> }
);

const CompareSharePage = loadable(
  () =>
    import(/* webpackChunkName: 'compare_share'*/ "./Compare/Share/CompareSharePage"),
  { fallback: <PreloaderComponent /> }
);

const CompletedRingsSharePage = loadable(
  () =>
    import(/* webpackChunkName: 'completed_rings_share'*/ "./CompletedRings/Share/CompletedRingsSharePage"),
  { fallback: <PreloaderComponent /> }
);

const NotFoundPage = loadable(
  () => import(/* webpackChunkName: 'not_found'*/ "./_common/NotFoundPage"),
  { fallback: <PreloaderComponent /> }
);

const StaticPageContainer = loadable(
  () =>
    import(/* webpackChunkName: 'static_page'*/ "./Static/StaticPageContainer"),
  { fallback: <PreloaderComponent /> }
);

const QuestionsContainer = loadable(
  () =>
    import(/* webpackChunkName: 'faq'*/ "./Static/Questions/QuestionsContainer"),
  { fallback: <PreloaderComponent /> }
);

const CartPage = loadable(
  () => import(/* webpackChunkName: 'cart'*/ "./Checkout/Cart/CartPage"),
  { fallback: <PreloaderComponent /> }
);

const CartServicesPage = loadable(
    () => import(/* webpackChunkName: 'cart'*/ "./Checkout/CartServices/CartServicesPage"),
    { fallback: <PreloaderComponent /> }
);

const DeliveryPage = loadable(
  () =>
    import(/* webpackChunkName: 'cart_delivery'*/ "./Checkout/Delivery/DeliveryPage"),
  { fallback: <PreloaderComponent /> }
);

const PaymentPage = loadable(
  () =>
    import(/* webpackChunkName: 'cart_payment'*/ "./Checkout/Payment/PaymentPage"),
  { fallback: <PreloaderComponent /> }
);

const PaymentServicesPage = loadable(
    () =>
        import(/* webpackChunkName: 'cart_payment'*/ "./Checkout/PaymentServices/PaymentServicesPage"),
    { fallback: <PreloaderComponent /> }
);


const ConfirmationSuccessPage = loadable(
  () =>
    import(/* webpackChunkName: 'cart_success'*/ "./Checkout/Confirmation/Success/ConfirmationSuccessPage"),
  { fallback: <PreloaderComponent /> }
);

const ConfirmationFailurePage = loadable(
  () =>
    import(/* webpackChunkName: 'cart_failure'*/ "./Checkout/Confirmation/Failure/ConfirmationFailurePage"),
  { fallback: <PreloaderComponent /> }
);

const ContactUsPage = loadable(
  () =>
    import(/* webpackChunkName: 'contact_us'*/ "./Static/ContactUs/ContactUsPage"),
  { fallback: <PreloaderComponent /> }
);

const ChangePasswordPage = loadable(
  () =>
    import(/* webpackChunkName: 'change_password'*/ "./Auth/Login/ChangePassword/ChangePasswordPage"),
  { fallback: <PreloaderComponent /> }
);

const BestSellersPage = loadable(
  () =>
    import(/* webpackChunkName: 'best_sellers'*/ "./Dynamic/BestSellers/BestSellersPage"),
  { fallback: <PreloaderComponent /> }
);

const SalePage = loadable(
  () => import(/* webpackChunkName: 'sale'*/ "./Dynamic/Sale/SalePage"),
  { fallback: <PreloaderComponent /> }
);

const DiamondsFeedPage = loadable(
  () =>
    import(/* webpackChunkName: 'diamonds_feed'*/ "./Feed/Diamonds/DiamondsFeedPage"),
  { fallback: <PreloaderComponent /> }
);

const Landing = loadable(
  () =>
    import(/* webpackChunkName: 'landing'*/ "./Landing/Landing"),
  { fallback: <PreloaderComponent /> }
);

const Catalog = loadable(
  () =>
    import(/* webpackChunkName: 'catalogs_feed'*/ "./Feed/Catalog/CatalogFeedPage"),
  { fallback: <PreloaderComponent /> }
);

const CatalogPage = loadable(
  () =>
    import(/* webpackChunkName: 'catalogs'*/ "./Product/Catalog/CatalogPage"),
  { fallback: <PreloaderComponent /> }
);

const JewelleryPage = loadable(
  () =>
    import(/* webpackChunkName: 'catalogs'*/ "./Feed/Catalog/JewelleryPage"),
  { fallback: <PreloaderComponent /> }
);

const EngagementFeedPage = loadable(
  () =>
    import(/* webpackChunkName: 'engagement_feed'*/ "./Feed/Engagement/EngagementFeedPage"),
  { fallback: <PreloaderComponent /> }
);

const WeddingFeedPage = loadable(
  () =>
    import(/* webpackChunkName: 'wedding_feed'*/ "./Feed/Wedding/WeddingFeedPage"),
  { fallback: <PreloaderComponent /> }
);

const Main = loadable(
  () => import(/* webpackChunkName: 'main_page'*/ "./Main/Main"),
  { fallback: <PreloaderComponent /> }
);

class App extends React.Component {

  render() {
    const routing = () => configRouting(undefined, this.props.city);

    return (
        <ErrorBoundary>

          <Switch>
            <WrappedRoute
                exact
                path={routing().changePassword}
                component={ChangePasswordPage}
            />
            <WrappedRoute
                exact
                path={routing().confirmEmail}
                component={ConfirmEmail}
            />

            <WrappedRoute exact path={routing().search} component={SearchFullPage} />

            <WrappedRoute
                exact
                path={routing().completedRings}
                component={CompletedRingsPage}
            />
            <WrappedRoute
                exact
                path={routing().referral}
                component={ReferralPage}
            />
            <WrappedRoute
                exact
                path={routing().completedRingsShare}
                component={CompletedRingsSharePage}
            />
            <WrappedRoute exact path={routing().reviews} component={ReviewsPage} />

            <WrappedRoute exact path={routing().favorite} component={FavoritePage} />
            <WrappedRoute
                exact
                path={routing().favoriteTab}
                component={FavoritePage}
            />
            <WrappedRoute
                exact
                path={routing().favoriteShare}
                component={FavoriteSharePage}
            />

            <WrappedRoute exact path={routing().compare} component={ComparePage} />
            <WrappedRoute exact path={routing().compareTab} component={ComparePage} />
            <WrappedRoute
                exact
                path={routing().compareShare}
                component={CompareSharePage}
            />

            <WrappedRoute
                exact
                path={routing().diamondsFeed}
                component={DiamondsFeedPage}
            />
            <WrappedRoute
                exact
                path={routing().diamondsFeedWithShape}
                component={DiamondsFeedPage}
            />
            <WrappedRoute
                exact
                path={routing().diamondProduct}
                component={DiamondPage}
            />
            <WrappedRoute
                exact
                path={routing().SpecialDiamondsFeed}
                component={DiamondsFeedPage}
            />
            <WrappedRoute
                exact
                path={routing().SpecialDiamondsFeedWithShape}
                component={DiamondsFeedPage}
            />
            <WrappedRoute
                exact
                path={routing().SpecialDiamondProduct}
                component={DiamondPage}
            />

            <WrappedRoute
                exact
                showroom={false}
                path={routing().landing}
                component={Landing}
            />
            <WrappedRoute
                exact
                path={routing().catalogFeed}
                component={Catalog}
            />
            <WrappedRoute
                exact
                path={routing().catalogFeedPagination}
                component={Catalog}
            />
            <WrappedRoute
                exact
                path={routing().catalogFeedWithFilter}
                component={Catalog}
            />
            <WrappedRoute
                exact
                path={routing().catalogFeedWithFilterPagination}
                component={Catalog}
            />
            <WrappedRoute
                exact
                path={routing().catalogProduct}
                component={CatalogPage}
            />
            <WrappedRoute
                exact
                path={routing().engagementFeed}
                component={EngagementFeedPage}
            />
            <WrappedRoute
                exact
                path={routing().engagementFeedPagination}
                component={EngagementFeedPage}
            />
            <WrappedRoute
                exact
                path={routing().engagementFeedWithFilter}
                component={EngagementFeedPage}
            />
            <WrappedRoute
                exact
                path={routing().engagementFeedWithFilterPagination}
                component={EngagementFeedPage}
            />
            <WrappedRoute
                exact
                path={routing().engagementProduct}
                component={EngagementPage}
            />
            <WrappedRoute
                exact
                path={routing().engagementProductReview}
                component={EngagementReviewsPage}
            />

            <WrappedRoute
                exact
                path={routing().weddingFeed}
                component={WeddingFeedPage}
            />
            <WrappedRoute
                exact
                path={routing().weddingFeedPagination}
                component={WeddingFeedPage}
            />
            <WrappedRoute
                exact
                path={routing().weddingFeedWithFilter}
                component={WeddingFeedPage}
            />
            <WrappedRoute
                exact
                path={routing().weddingFeedWithFilterPagination}
                component={WeddingFeedPage}
            />
            <WrappedRoute
                exact
                path={routing().weddingFeedWithGenderFilter}
                component={WeddingFeedPage}
            />
            <WrappedRoute
                exact
                path={routing().weddingFeedWithGenderFilterPagination}
                component={WeddingFeedPage}
            />
            <WrappedRoute
                exact
                path={routing().weddingProduct}
                component={WeddingPage}
            />
            <WrappedRoute
                exact
                path={routing().weddingProductReview}
                component={WeddingReviewsPage}
            />

            <CheckoutServicesRoute exact path={routing().cartServices} component={CartServicesPage} />
            <CheckoutServicesRoute exact path={routing().servicesOrder} component={PaymentServicesPage} />

            <CheckoutRoute exact path={routing().cart} component={CartPage} />
            <CheckoutRoute exact path={routing().delivery} component={DeliveryPage} />
            <CheckoutRoute exact path={routing().order} component={PaymentPage} />

            <CheckoutRoute
                exact
                path={routing().paymentSuccess}
                component={ConfirmationSuccessPage}
            />
            <CheckoutRoute
                exact
                path={routing().paymentFailure}
                component={ConfirmationFailurePage}
            />

            <WrappedRoute exact path={routing().blog} component={BlogPage} />
            <WrappedRoute exact path={routing().blogTag} component={BlogTagPage} />
            <WrappedRoute
                exact
                path={routing().blogArticle}
                component={BlogArticlePage}
            />

            <WrappedRoute
                exact
                path={routing().contactUs}
                component={ContactUsPage}
                showroom={false}
            />
            <WrappedRoute exact path={routing().faq} component={QuestionsContainer} />
            <WrappedRoute exact path={routing().sale} component={SalePage} />
            <WrappedRoute
                exact
                path={routing().bestSellers}
                component={BestSellersPage}
            />
            <WrappedRoute
                exact
                path={routing().jewelleryFeed}
                component={JewelleryPage}
            />
            <WrappedRoute exact path={routing().root} component={Main} />
            <WrappedRoute
                exact
                path={routing().staticPage}
                component={StaticPageContainer}
            />
            {/*<WrappedRoute*/}
            {/*    exact*/}
            {/*    path={routing().googleSiteVerification}*/}
            {/*    component={StaticPageContainer}*/}
            {/*/>*/}

            <WrappedRoute component={NotFoundPage} showroom={false} />
          </Switch>
        </ErrorBoundary>
    );
  }
}

export default App;
