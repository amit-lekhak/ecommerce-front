import React, { useEffect, useState } from "react";
import { getCategories, searchList } from "./apiCore";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    if (search) {
      searchList({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const onChangeHandler = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    searchData();
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length <= 0) {
      return `No products found`;
    }
  };

  const showSearchResults = (searchResults = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>
        <div className="row">
          {searchResults.map((product, index) => (
            <Card key={index} product={product} />
          ))}
        </div>
      </div>
    );
  };

  const searchForm = () => {
    return (
      <form onSubmit={onSubmitHandler}>
        <span className="input-group-text">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <select
                className="btn mr-2"
                onChange={onChangeHandler("category")}
              >
                <option value="All">All</option>
                {categories.map((category, index) => {
                  return (
                    <option key={index} value={category._id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <input
              type="search"
              className="form-control"
              placeholder="Search by name"
              onChange={onChangeHandler("search")}
            />
          </div>
          <div className="btn input-group-append" style={{ border: "none" }}>
            <button className="input-group-text">Search</button>
          </div>
        </span>
      </form>
    );
  };

  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      <div className="container-fluid mb-3">{showSearchResults(results)}</div>
    </div>
  );
};

export default Search;
