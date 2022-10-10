import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {SiteHeader, SiteFooter} from './components/common'
import {Home, Shop, PageNotFound} from './components'
import './assets/css/style.scss'
const App = () => {
  return (
    <>
      <Router>
        <SiteHeader />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop/page/:page" element={<Shop />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        <SiteFooter />
      </Router>
    </>
  );
}

export default App;