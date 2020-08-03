<h2 align="center">nxtk</h1>
<p align="center">
  A TypeScript utility for Next.js
</p>

# Installation

To install the latest version:

```sh
npm install --save nxtk
```

```sh
yarn add nxtk
```

⚠️ Requires TypeScript 3.2+ and `"strictNullChecks": true` to work properly!

# Usage

## Importing

```tsx
import { nxtk } from 'nxtk';
```

## Data fetching

Currently `nxtk` contains just one method: `fetch`. This utility is designed to reduce the boilerplate required to implement Next.js gets with data fetching (`getStaticProps` and `getServerSideProps`).

`nxtk.fetch` accepts a single input, an object containing two keys (both optional), `server` and `static`. As you might have guessed, `server` corresponds to your `getServerSideProps` function and `static` corresponds to your `getStaticProps` implementation. Both functions should be async. The `ctx` input is automatically typed by `nxtk`. Here's an example.

```tsx
// pages/yourpage.tsx

import React from 'react';
import { nxtk } from 'nxtk';

const Fetcher = nxtk.fetch({
  async server(ctx) {
    // ctx is automatically typed
    ctx.req;
    const props = { greeting: 'Hello' };
    return { props };
  },
  async static(ctx) {
    // ctx is automatically typed
    ctx.params;
    const props = { nested: { data: 'World' } };
    return { props };
  },
});
```

### A note on syntax

If you haven't seen this "method definition" syntax before, you can read about it [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions). You can write this code like this if it looks more familiar:

```ts
const Fetcher = nxtk.fetch({
  server: async ctx => {
    // ctx is automatically typed
    ctx.req;
    const props = { greeting: 'Hello' };
    return { props };
  },
  static: async ctx => {
    // ctx is automatically typed
    ctx.params;
    const props = { nested: { data: 'World' } };
    return { props };
  },
});
```

## Exporting the functions

Once you've instantiated your fetcher, you can export it's components like so:

```tsx
export const getServerSideProps = Fetcher.getServerSideProps;
export const getStaticProps = Fetcher.getStaticProps;
```

## Typing your components

Here's the best part! `nxtk` _automatically infers **and** merges_ the return types of your fetcher functions, so properly typing your page components is dead easy:

```tsx
export default function Home(props: typeof Fetcher['props']) {
  props; // { greeting: string; nested: { data: string } };

  return (
    <div>
      <p>{`${props.greeting} ${props.nested.data}`} </p>
    </div>
  );
}
```

## Full sample page

The full code of the page implemented above is available at [https://github.com/vriad/nxtk/blob/master/src/example.tsx](https://github.com/vriad/nxtk/blob/master/src/example.tsx).

### Suggestions

If you have any other suggestions of how nxtk could make using Next.js and TypeScript more painless, create an issue! I hope to expand the scope of `nxtk` wherever pain points exist.

Created by [@vriad](https://twitter.com/vriad)<br>
MIT License
