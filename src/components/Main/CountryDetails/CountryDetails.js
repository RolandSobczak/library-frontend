import React, { useContext } from "react";
import useFetchElement from "../../Helpers/useFetchElementBy";
import { useParams } from "react-router-dom";
import { AppContext } from "../../AppProvider";
import AuthorsList from "../Authors/AuthorsList/AuthorsList";

const CountryDetails = () => {
  const { slug } = useParams();
  const { urls } = useContext(AppContext);
  const [country, isLoading, error] = useFetchElement(
    urls.countries.href,
    urls.countries.method,
    "slug",
    slug
  );

  return (
    <div className="text-center">
      <h1 className="my-5">Autorzy z kraju: {country.name}</h1>
      <AuthorsList params={{ origin_country: country.id }} />
    </div>
  );
};

export default CountryDetails;
