import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import LoginPage from "./Login/LoginPage";
import Dashboard from "./Main/Dashboard/Dashboard";
import Books from "./Main/Books/Books";
import BookDetails from "./Main/BooksDetails.js/BookDetail";

import Authors from "./Main/Authors/Authors";
import Categories from "./Main/Categories/Categories";
import Main from "./Main/Main";
import AuthorsDetails from "./Main/AuthorsDetails/AuthorDetails";
import CategoryDetail from "./Main/CategoriesDetails/CategoryDetails";
import Countries from "./Main/Countries/Countries";
import CountryDetails from "./Main/CountryDetails/CountryDetails";
import UserProfile from "./Main/Profile/UserProfile";
import { useContext } from "react";
import { AppContext } from "./AppProvider";
import PageNotFound from "./PageNotFound";
import MyBorrowings from "./Main/MyBorrowings/MyBorrowings";
import MyCollections from "./Main/MyCollections/MyCollections";

const AppRoutes = () => {
  const { isLoged } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="signin" element={<LoginPage />} />
      <Route path="/" element={<Main />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="books/:slug" element={<BookDetails />} />
        <Route path="books" element={<Books />} />
        <Route path="authors" element={<Authors />} />
        <Route path="authors/:slug" element={<AuthorsDetails />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/:slug" element={<CategoryDetail />} />
        <Route path="countries" element={<Countries />} />
        <Route path="countries/:slug" element={<CountryDetails />} />
        {isLoged && <Route path="my-borrowings" element={<MyBorrowings />} />}
        {isLoged && <Route path="my-collections" element={<MyCollections />} />}
        {isLoged && <Route path="profile" element={<UserProfile />} />}
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
