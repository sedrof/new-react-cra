import React from "react";
import ReactDOM from "react-dom/client";
import { LinearProgress } from "@mui/material";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from 'store'
// import theme from 'theme/index'


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <>

  {/* <ThemeProvider theme = {Theme}> */}
  <Provider store={store}>
  {store.getState().user.loading && <LinearProgress color="success" />}
      <App />
    </Provider>
    {/* </ThemeProvider> */}
  </>
    

);

reportWebVitals();
