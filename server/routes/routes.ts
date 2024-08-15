/*
:--------------------------------------------------------------------------
: @Public
: This routes don't require auth access to use it
:--------------------------------------------------------------------------
*/

export {
    Route_Main,
    Route_Public_User,
    Route_Public_Checkout,
    Route_Public_Evaluation,
    Route_Public_Search,
    Route_Public_News,
    Route_Public_Stripe,
    Route_Public_Reports,
    Route_Public_Banners,
    Route_Public_Blogs,
    Route_Public_Contact,
} from './public';

/*
:--------------------------------------------------------------------------
: @Client
: This routes requires membership to access
:--------------------------------------------------------------------------
*/

export {
    Route_Client_User,
    Route_Client_Upload,
    Route_Client_Blog,
    Route_Client_BlogReplies,
    Route_Client_Stripe,
} from './client';

/*
:--------------------------------------------------------------------------
: @Admin
: This routes requires admin level access
:--------------------------------------------------------------------------
*/

export {
    Route_Admin_User,
    Route_Admin_News,
    Route_Admin_Evaluations,
    Route_Admin_Reports,
    Route_Admin_Banners,
} from './admin';
