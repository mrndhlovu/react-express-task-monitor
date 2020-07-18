import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";

import { Button, Header, Input, Pagination } from "semantic-ui-react";

import { getSearchQueryString } from "../../utils/urls";
import { requestImages } from "../../apis/apiRequests";
import { SUGGESTED_COVERS } from "../../constants/constants";
import { useMainContext } from "../../utils/hookUtils";
import SearchImageList from "./SearchImageList";
import UIWrapper from "../sharedComponents/UIWrapper";
import { X, Search } from "react-feather";
import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";

const displayStyles = {
  display: "flex",
  flexWrap: "wrap",
  minWidth: "300px",
  marginTop: "5px",
};

const AddCoverImage = ({ handleMakeCover }) => {
  const { alertUser } = useMainContext();

  const [isLoading, setIsLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [searchQuery, setSearchQuery] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  const [totalPages, setTotalPages] = useState(null);

  const handleSuggestionClick = async (suggestion) => {
    setSearchQuery(suggestion);
    const searchTerm = suggestion || searchQuery;
    if (!searchTerm) return alertUser("Search term required!");
    const query = getSearchQueryString(searchTerm);
    setIsLoading(true);

    await requestImages(query, pageNum)
      .then((res) => {
        setTotalPages(res.data.total_pages);
        setSearchResult(res.data.results);
        setIsLoading(false);
        setPageNum(1);
      })
      .catch((error) =>
        alertUser(error.message, null, () => setIsLoading(false))
      );
  };

  const handleClearSearch = () => {
    setSearchResult(null);
    setSearchQuery(null);
  };

  const handlePageChange = async (value) => {
    setPageNum(value);
    setIsLoading(true);
    await requestImages(searchQuery, value)
      .then((res) => {
        setTotalPages(res.data.total_pages);
        setSearchResult(res.data.results);
        setIsLoading(false);
      })
      .catch((error) =>
        alertUser(error.message, null, () => setIsLoading(false))
      );
  };

  return (
    <Fragment>
      <Header
        className="images-source"
        content="Images by Unsplash"
        as="a"
        href="https://unsplash.com"
      />
      {!searchQuery && <Header content="Suggested searches" as="h5" />}
      <Input
        className="image-search-input"
        icon={
          <div className="center">
            {searchQuery ? (
              <X onClick={() => handleClearSearch()} className="uiIconDark" />
            ) : (
              <Search />
            )}
          </div>
        }
        placeholder="Search"
        size="small"
        fluid
        defaultValue={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" ? handleSuggestionClick() : null)}
      />

      {searchResult && (
        <Pagination
          className="img-search-pagination"
          defaultActivePage={1}
          firstItem={null}
          lastItem={null}
          totalPages={totalPages}
          onPageChange={(e, data) => handlePageChange(data.activePage)}
          pointing
          secondary
        />
      )}
      <div>
        <UIWrapper padding="0" display={displayStyles}>
          {!searchResult &&
            SUGGESTED_COVERS.map((suggestion, index) => (
              <UIWrapper padding="8" key={index}>
                <Button
                  key={index}
                  content={suggestion}
                  size="tiny"
                  compact
                  onClick={() => handleSuggestionClick(suggestion)}
                />
              </UIWrapper>
            ))}
        </UIWrapper>
        {isLoading && <UILoadingSpinner />}
        {searchResult && (
          <SearchImageList
            images={searchResult}
            handleMakeCover={handleMakeCover}
          />
        )}
      </div>
    </Fragment>
  );
};

AddCoverImage.propTypes = {
  handleMakeCover: PropTypes.func.isRequired,
};

export default AddCoverImage;
