import React from "react";
//redux
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import AppRoutes from "./Routes/AppRoutes";
import store from "./store";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </Router>
  );
}

export default App;
