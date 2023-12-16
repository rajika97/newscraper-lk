import React from "react";
import { Helmet } from "react-helmet";

const GoogleAnalytics = () => (
  <Helmet>
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-4CFZ16RG94"
    ></script>
    <script>
      window.dataLayer = window.dataLayer || []; function gtag()
      {dataLayer.push(arguments)}
      gtag('js', new Date()); gtag('config', 'G-4CFZ16RG94');
    </script>
  </Helmet>
);

export default GoogleAnalytics;
