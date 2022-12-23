import React, { useContext } from "react";
import useFetchElement from "../../Helpers/useFetchElementBy";
import { useParams } from "react-router-dom";
import { AppContext } from "../../AppProvider";
import BooksList from "../Books/BooksList/BooksList";

const CategoryDetail = () => {
  const { slug } = useParams();
  const { urls } = useContext(AppContext);
  const [category, isLoading, error] = useFetchElement(
    urls.categories.href,
    urls.categories.method,
    "slug",
    slug
  );

  return (
    <div className="text-center">
      <h1 className="my-5">Książki z kategorii: {category.name}</h1>
      <BooksList params={{ category: category.id }} />
    </div>
  );
};

export default CategoryDetail;
