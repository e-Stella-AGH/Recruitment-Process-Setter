# estella-two-column-dnd

> Two column layout with drag and drop, using react beautiful dnd and material ui for layout

[![NPM](https://img.shields.io/npm/v/estella-two-column-dnd.svg)](https://www.npmjs.com/package/estella-two-column-dnd) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save estella-two-column-dnd
```

## Usage
```jsx
import React from "react";
import { TwoColumnDnD } from "estella-two-column-dnd";
import { Card, Typography } from "@material-ui/core";

const getItem = index => {
  return {
    title: `title-${index}`,
    id: index
  };
};

const getItems = n => {
  return Array(n).fill(null)
    .map((item, index) => getItem(index));
};

const App = () => {
  return <TwoColumnDnD
    firstListItems={getItems(10)}
    secondListItems={getItems(5)}
    forbiddenIndexes={[0, 15]}
    itemRender={(item) => (<Card style={{margin: '1em'}}><Typography variant="h6">{item.title}</Typography></Card>)}
  />;
};

export default App;
```

Sample code renders this view:
![sample view](sample.png)

### Business logic
Library was a bit created for our needs, so there are some limitations that we wanted to

## License

MIT © [Davenury](https://github.com/Davenury)
