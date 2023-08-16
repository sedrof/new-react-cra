import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { checkAuth } from "features/user";
import HomePage from "containers/HomePage";
import Login from "containers/Login";
import "./App.css";
import ParseFile from "containers/ParseFile";
import TransactionsListPage from "containers/TransactionList";

import EditForm from "components/TransactionEdit2";
import Faq from "containers/Faq";
import Profile from "containers/Profile";
import ContactsIndex from "containers/ContactsIndex";
import ContactDetail from "components/ContactDetail/index.js";


const App = (props) => {
  const dispatch = useDispatch();


  
  useEffect(() => {
    dispatch(checkAuth());
  }, );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/UploadFile" element={<ParseFile />} />
        <Route path="/update/:ids/*" element={<EditForm />} />
        <Route path="/edit/contact/:ids/*" element={<ContactDetail />} />
        <Route path="/list" element={<TransactionsListPage />} />
        <Route path="/FAQ" element={<Faq />} />
        <Route path="/contacts" element={<ContactsIndex />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;

    // "@material-ui/icons": "^4.11.3",

    // "autoprefixer": "10.4.5",

    // "bootstrap-icons": "^1.8.3",

    // "cookie": "^0.5.0",

    // "formik-mui": "^5.0.0-alpha.0",

    // "moment": "^2.29.4",

    // "react-bootstrap": "^2.4.0",

 // "react-multi-date-picker": "^3.3.4",