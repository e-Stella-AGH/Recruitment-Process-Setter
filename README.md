# estella-two-column-dnd

> Two column layout with drag and drop, using react beautiful dnd and material ui for layout

[![NPM](https://img.shields.io/npm/v/estella-two-column-dnd.svg)](https://www.npmjs.com/package/estella-two-column-dnd) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save estella-two-column-dnd
```

## Usage
```jsx
import React from 'react'

import { TwoColumnDnD } from "estella-two-column-dnd";

const App = () => {
  return <TwoColumnDnD firstListItems={getItems(10)} secondListItems={getItems(5)} forbiddenIndexes={[0, 15]} />
}

export default App
```

## License

MIT © [Davenury](https://github.com/Davenury)
