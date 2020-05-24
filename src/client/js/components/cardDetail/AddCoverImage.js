import React, { useState, useEffect, Fragment } from "react";

import { Button, Header, Input, Icon } from "semantic-ui-react";

import { emptyFunction } from "../../utils/appUtils";
import { requestImages } from "../../apis/apiRequests";
import { SUGGESTED_COVERS } from "../../constants/constants";
import SearchImageList from "./SearchImageList";
import UIWrapper from "../sharedComponents/UIWrapper";
import { getSearchQueryString } from "../../utils/urls";

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

  const handleSuggestionClick = (suggestion) => {
    setSearchResult(null);
    setSearchQuery(suggestion);
    setSearch(true);
  };

  const handleClearSearch = () => {
    setSearchQuery(null);
  };

  useEffect(() => {
    if (!search) return emptyFunction();
    const query = getSearchQueryString(searchQuery);

    const getQueryImageList = async () => {
      await requestImages(query).then((res) => {
        try {
          setSearchResult(res.data.results);
          setSearch(false);
        } catch (error) {
          notify({ message: error.message });
        }
      });
    };
    getQueryImageList();
  }, [searchQuery, search]);

  // TODO add image search pagination

  return (
    <Fragment>
      <Header
        className="images-source"
        content="Images by Unsplash"
        as="a"
        href="https://unsplash.com"
      />
      {!searchResult && <Header content="Suggested searches" as="h5" />}
      <Input
        className="image-search-input"
        icon={
          <Icon
            name={!searchResult ? "search" : "close"}
            link={(searchResult && searchResult.length > 0) || false}
            onClick={() =>
              searchResult ? handleClearSearch() : emptyFunction()
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
