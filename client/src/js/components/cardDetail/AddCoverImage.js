import React, { useState, useEffect } from "react";

import { Button, Header, Input, Icon } from "semantic-ui-react";

import { emptyFunction } from "../../utils/appUtils";
import { requestImages } from "../../apis/apiRequests";
import { SUGGESTED_COVERS } from "../../constants/constants";
import SearchImageList from "./SearchImageList";
import UIWrapper from "../sharedComponents/UIWrapper";

const displayStyles = {
  display: "flex",
  flexWrap: "wrap",
  minWidth: "300px"
};

const AddCoverImage = ({ ...props }) => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [search, setSearch] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  const handleSuggestionClick = suggestion => {
    setSearchQuery(suggestion);
    setSearch(true);
  };

  useEffect(() => {
    if (!search) return emptyFunction();
    const query = searchQuery.toLowerCase().replace(" ", "+");

    const getQueryImageList = async () => {
      await requestImages(query).then(res => {
        try {
          setSearchResult(res.data.hits);
          setSearch(false);
          setSearchQuery(null);
        } catch (error) {
          alert(error.message);
        }
      });
    };
    getQueryImageList();
  }, [searchQuery, search]);

  return (
    <>
      {!searchResult && <Header content="Suggested searches" as="h4" />}
      <Input
        icon={
          <Icon
            name={!searchResult ? "search" : "close"}
            link={searchResult}
            onClick={() =>
              searchResult ? setSearchResult(null) : emptyFunction()
            }
          />
        }
        placeholder="Search"
        size="small"
        fluid
        defaultValue={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        onKeyDown={e => (e.key === "Enter" ? setSearch(true) : null)}
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
    </>
  );
};

export default AddCoverImage;
