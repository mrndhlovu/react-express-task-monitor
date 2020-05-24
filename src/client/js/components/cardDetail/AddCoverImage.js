import React, { useState, useEffect, Fragment } from "react";

import { Button, Header, Input, Icon, Pagination } from "semantic-ui-react";

import { emptyFunction } from "../../utils/appUtils";
import { getSearchQueryString } from "../../utils/urls";
import { requestImages } from "../../apis/apiRequests";
import { SUGGESTED_COVERS } from "../../constants/constants";
import SearchImageList from "./SearchImageList";
import UIWrapper from "../sharedComponents/UIWrapper";

const displayStyles = {
  display: "flex",
  flexWrap: "wrap",
  minWidth: "300px",
  marginTop: "5px",
};

const AddCoverImage = ({ notify, ...props }) => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [search, setSearch] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  const [totalPages, setTotalPages] = useState(null);

  const handleSuggestionClick = (suggestion) => {
    setSearchResult(null);
    setSearchQuery(suggestion);
    setSearch(true);
  };

  const handleClearSearch = () => {
    setSearchQuery(null);
    setSearchResult(null);
  };

  const handlePageChange = async (value) => {
    setPageNum(value);
    await requestImages(searchQuery, value).then((res) => {
      try {
        setTotalPages(res.data.total_pages);
        setSearchResult(res.data.results);
      } catch (error) {
        notify({ message: error.message });
      }
    });
  };

  useEffect(() => {
    if (!search) return emptyFunction();
    const query = getSearchQueryString(searchQuery);

    const getQueryImageList = async () => {
      await requestImages(query, pageNum).then((res) => {
        try {
          setTotalPages(res.data.total_pages);
          setSearchResult(res.data.results);
        } catch (error) {
          notify({ message: error.message });
        }
      });
    };
    getQueryImageList();
    setSearch(false);

    return () => {
      setSearchResult(null);
      setSearch(false);
      setPageNum(1);
    };
  }, [searchQuery, search]);

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
          <Icon
            name={!searchQuery ? "search" : "close"}
            link
            onClick={() =>
              searchQuery ? handleClearSearch() : emptyFunction()
            }
          />
        }
        placeholder="Search"
        size="small"
        fluid
        defaultValue={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" ? setSearch(true) : null)}
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
      {searchResult && <SearchImageList data={searchResult} {...props} />}
    </Fragment>
  );
};

export default AddCoverImage;
