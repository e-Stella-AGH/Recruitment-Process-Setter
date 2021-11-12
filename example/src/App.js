import React, { useEffect, useState } from "react";

import "estella-two-column-dnd/dist/index.css";
import { TwoColumnDnD } from "estella-two-column-dnd";
import { Card, Typography } from "@material-ui/core";

const getItem = index => {
  return {
    title: `title-${index}`,
    id: index
  };
};

const getItems = () => {
  return fetch("http://localhost:8080/api/process/stages")
    .then(response => response.json())
};

const App = () => {

  const [items, setItems] = useState([])

  useEffect(() => {
    getItems()
      .then(data => setItems(data))
  }, [])

  return <TwoColumnDnD
          firstListItems={items}
          secondListItems={items}
          forbiddenIndexes={[0, 15]}
          itemRender={(item) => (<Card style={{margin: '1em'}}><Typography variant="h6">{item}</Typography></Card>)}
          shouldRemoveFromSecondList={false}
          shouldBlockAddingToSecondList={false}
          materialButtonProps={{variant: "outlined"}}
          onSubmit={(first, second) => console.log(first, second)}
          onFirstListChange={(items) => console.log(items)}
          leftSubmitGridProps={{lg: 6}}
  />;
};

export default App;
