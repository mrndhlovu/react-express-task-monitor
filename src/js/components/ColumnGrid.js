import React from "react";

import { Grid } from "semantic-ui-react";

import Column from "./Column";

const ColumnGrid = ({ columns, columnCount, ...rest }) => {
  const renderColumns = () => {
    return Object.keys(columns).map(key => (
      <Grid.Column width={5} key={key}>
        <Column key={key} column={columns[key]} {...rest} />
      </Grid.Column>
    ));
  };

  return (
    <Grid>
      <Grid.Row>{renderColumns()}</Grid.Row>
    </Grid>
  );
};

export default ColumnGrid;
