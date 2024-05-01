import React from "react";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortBy = searchParams.get("sortBy") || "";

  function handleChange(event) {
    searchParams.set("sortBy", event.target.value);
    setSearchParams(searchParams);
    console.log(event.target.value);
  }
  return (
    <Select
      options={options}
      onChange={handleChange}
      value={currentSortBy}></Select>
  );
}

export default SortBy;
