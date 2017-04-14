import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import { isLoggedIn } from '../helpers/auth';
import { BASE_SCREEN, LOGIN_SCREEN, ACCOUNT_DETAILS_SCREEN, ACCOUNTS_OVERVIEW_SCREEN } from '../constants';
import {LEADS_OVERVIEW_SCREEN} from '../constants/controlTypes';
import Layout from '../components/Layout';

// Authentication pages
import LoginPage from '../components/Authentication/Login/LoginPage';
import ResetPasswordPage from '../components/Authentication/Login/ResetPassword/ResetPasswordPage';

import OverviewPage from '../components/OverviewPage/OverviewPage';
import DetailsPage from '../components/DetailsPage/DetailsPageContainer';

// Probably temp pages
import CustomerPage from '../components/Customer/CustomerPage';
//

import PrivacyPolicyPage from '../components/PrivacyPolicy/PrivacyPolicyPage';

import HomePage from '../components/Home/HomePageContainer';
import NotFoundPage from '../components/NotFound/NotFoundPage.jsx';

export default (
  <Route path="/" component={Layout} pageId={BASE_SCREEN} >

    <IndexRedirect to="/accounts" />

    <Route path="login">
      <IndexRoute component={LoginPage} pageId={LOGIN_SCREEN} />
      <Route path="reset-password" component={ResetPasswordPage} />
    </Route>

    <Route path="accounts">

      {/* TODO: make higher-order component and pass all parameters via HOC */}
      <IndexRoute
        component={isLoggedIn(OverviewPage)}
        pageId={ACCOUNTS_OVERVIEW_SCREEN}
        select_options={'ACC_OVERVIEW'}
        accounts_api_route={'/account'}
        account_search_selection={'ACC_SEARCH_A_TYPE'}
        account_search_listbox={'ACC_LISTBOX'}
        account_type={'ATYPE1'}
        />

      <Route
        path="new"
        component={isLoggedIn(DetailsPage)}
        pageId={ACCOUNT_DETAILS_SCREEN}
        select_options={'ACC_DETAILS'}
        returnRoute={'accounts'}
        accountType={'ATYPE1'}
        />

      <Route
        path=":accountId"
        component={isLoggedIn(DetailsPage)}
        pageId={ACCOUNT_DETAILS_SCREEN}
        select_options={'ACC_DETAILS'}
        returnRoute={'accounts'}
        accountType={'ATYPE1'}
        />
    </Route>

    <Route path="leads">

      <IndexRoute
        component={isLoggedIn(OverviewPage)}
        pageId={LEADS_OVERVIEW_SCREEN}
        select_options={'LEAD_OVERVIEW'}
        accounts_api_route={'/account/lead'}
        account_search_selection={'LEAD_SEARCH_L_STATUS'}
        account_search_listbox={'LEAD_LISTBOX'}
        account_type={'ATYPE2'}
        />

      <Route
        path="new"
        component={isLoggedIn(DetailsPage)}
        pageId={ACCOUNT_DETAILS_SCREEN}
        select_options={'ACC_DETAILS'}
        returnRoute={'leads'}
        accountType={'ATYPE2'}
        />

      <Route
        path=":accountId"
        component={isLoggedIn(DetailsPage)}
        pageId={ACCOUNT_DETAILS_SCREEN}
        select_options={'ACC_DETAILS'}
        returnRoute={'leads'}
        accountType={'ATYPE2'}
        />
    </Route>

    <Route path="customer">
      <IndexRoute component={CustomerPage} />
    </Route>

    <Route path="privacy-policy" component={PrivacyPolicyPage} />

    <Route path="*" component={NotFoundPage} />
  </Route>
);
