import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "nprogress/nprogress.css";
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "./../store/store";
import NProgress from "nprogress";
import Router from "next/router";
function MyApp({ Component, pageProps }) {
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });
  Router.events.on("routeChangeError", () => {
    NProgress.done();
  });
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
