import React from "react";

import { Grid } from "semantic-ui-react";
import Column from "./Column";

const ColumnGrid = ({ columns, columnCount, ...rest }) => {
  console.log("columns: ", columns);
  const renderColumns = () => {
    return Object.keys(columns).map(key => (
      <Column
        key={key}
        name={columns[key].name}
        {...rest}
        columnId={columns[key].id}
        cards={columns[key].cards}
      />
    ));
  };

  return (
    <Grid columns={columnCount}>
      <Grid.Row>{renderColumns()}</Grid.Row>
    </Grid>
  );
};

export default ColumnGrid;
