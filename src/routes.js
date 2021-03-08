import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import { store, persistor } from './store'

import AuthorizedRoute from './pages/authorizedRoute/AuthorizedRoute'
import AppContainer from './pages/app/AppContainer'
import BookListContainer from './pages/bookList/BookListContainer'
import BookFormContainer from './pages/bookForm/BookFormContainer'
import SigninContainer from './pages/signin/SigninContainer'
import SettingsContainer from './pages/settings/SettingsContainer'
import TermsOfUse from './pages/static/TermsOfUse'
import PrivacyPolicy from './pages/static/PrivacyPolicy'

const routes = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <AppContainer>
          <Switch>
            <Route path='/signin' component={SigninContainer} exact />
            <Route path='/termsOfUse' component={TermsOfUse} exact />
            <Route path='/privacyPolicy' component={PrivacyPolicy} exact />
            <AuthorizedRoute path='/' component={BookListContainer} exact />
            <AuthorizedRoute path='/books/:id' component={BookFormContainer} exact />
            <AuthorizedRoute path='/settings' component={SettingsContainer} exact />
            <Redirect from='*' to='/' />
          </Switch>
        </AppContainer>
      </Router>
    </PersistGate>
  </Provider>
)

export default routes
