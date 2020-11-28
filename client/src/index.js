import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
      <Provider store={store}>
                  <Auth0Provider
                        domain="henryproject.us.auth0.com"
                        clientId="GvwaC9cM63Uwrc11qGIvwmP4Iyf7zMiw"
                        redirectUri={window.location.origin}
                  >
                        <App />
                  </Auth0Provider>
      </Provider>,
      document.getElementById("root")
);
