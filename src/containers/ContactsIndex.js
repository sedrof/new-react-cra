import React, { useState, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Breadcrumbs

} from "@mui/material";
import { useDebounce } from "use-debounce";
import ContactsList from "components/ContactsList";
import Layout from "components/Layout";
import { getFamilyMembers } from "features/api";




const ContactsIndex = (props) => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [newSearch] = useDebounce(search, 100);
  const dispatch = useDispatch();
  const { family_members, count, loading } = useSelector((state) => state.api);

  
  React.useEffect(() => {
    dispatch(getFamilyMembers({ page, newSearch }));
  }, [family_members?.length]);

    const { numSelected, updateListOfIds } = props


  return (
    <Layout>
      <div
        style={{
          marginLeft: "60px",
        }}
        role="presentation"
      >
        <Breadcrumbs aria-label="breadcrumb">
          <NavLink className="nav-link-faq" to="/">
            Home
          </NavLink>
          <Typography color="text.primary">Contacts</Typography>
        </Breadcrumbs>
    <ContactsList
              contacts={family_members}
              loading={loading}
              setPage={setPage}
              page={page}
    />
    </div>
    </Layout>
  );
};

export default ContactsIndex;
