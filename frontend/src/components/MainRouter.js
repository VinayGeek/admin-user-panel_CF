import React from "react";
import { Route, Routes } from "react-router-dom";
import TestTable from "../pages/TestTable";
import TestForm from "../pages/TestForm";
import EditForm from "../pages/EditForm";

const MainRouter = () => {
  return (
    <Routes>
      <Route exact path='/' element={<TestTable />} />
      <Route exact path='/create-test' element={<TestForm />} />
      <Route exact path='/edit-test' element={<EditForm />} />
    </Routes>
  );
};

export default MainRouter;
