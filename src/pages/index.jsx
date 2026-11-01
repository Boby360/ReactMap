// @ts-check
import * as React from 'react'
import { Route, Routes } from 'react-router'

import { Config } from '@components/Config'

import { MapPage } from './map'
import { ErrorPage } from './Error'

// Pages other than the map are loaded on demand so their code is not part
// of the initial map bundle.
const LoginPage = React.lazy(() =>
  import('./login').then(({ LoginPage: Page }) => ({ default: Page })),
)
const BlockedPage = React.lazy(() =>
  import('./Blocked').then(({ BlockedPage: Page }) => ({ default: Page })),
)
const DataManagerPage = React.lazy(() =>
  import('./data').then(({ DataManagerPage: Page }) => ({ default: Page })),
)
const ResetPage = React.lazy(() =>
  import('./Reset').then(({ ResetPage: Page }) => ({ default: Page })),
)
const LocalesPage = React.lazy(() =>
  import('./locales').then(({ LocalesPage: Page }) => ({ default: Page })),
)
const Playground = React.lazy(() =>
  import('./playground').then(({ PlaygroundPage }) => ({
    default: PlaygroundPage,
  })),
)

const mapRoute = (
  <Config>
    <MapPage />
  </Config>
)
const loginRoute = (
  <Config>
    <LoginPage />
  </Config>
)
const dataRoute = (
  <Config>
    <DataManagerPage />
  </Config>
)
const blockedRoute = (
  <Config>
    <BlockedPage />
  </Config>
)
const playgroundRoute = (
  <Config>
    <Playground />
  </Config>
)
const errorRoute = <ErrorPage />
const resetRoute = <ResetPage />
const localesPage = <LocalesPage />

export function Pages() {
  return (
    <Routes>
      <Route path="/" element={mapRoute} />
      <Route path="reset" element={resetRoute} />
      <Route path="login" element={loginRoute} />
      <Route path="data-management" element={dataRoute} />
      <Route path="locales" element={localesPage} />
      <Route path="playground" element={playgroundRoute} />
      <Route path="blocked/:info" element={blockedRoute} />
      <Route path="@/:lat/:lon" element={mapRoute} />
      <Route path="@/:lat/:lon/:zoom" element={mapRoute} />
      <Route path="id/:category/:id" element={mapRoute} />
      <Route path="id/:category/:id/:zoom" element={mapRoute} />
      <Route path="*" element={errorRoute} />
    </Routes>
  )
}
