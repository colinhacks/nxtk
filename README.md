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

## Data fetching

Currently `nxtk` contains just one method: `fetch`. This utility is designed to reduce the boilerplate required to implement Next.js gets with data fetching (`getStaticProps` and `getServerSideProps`).

`nxtk.fetcher` accepts a single argument: an object containing two keys (both optional), `server` and `static`. These should correspond to an async function. `nxtk` automatically types the `ctx` input (`GetServerSidePropsContext`
and `GetStaticPropsContext` respectively).

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

## Exporting methods

Once you've instantiated your fetcher, you can export it's components like so:

```tsx
export const getServerSideProps = Fetcher.getServerSideProps;
export const getStaticProps = Fetcher.getStaticProps;
```

## Prop merging

Here's the best part! `nxtk` _automatically infers_ the return types of your fetcher functions. It also merges the types for you, so properly typing your page components is dead easy:

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

<p>
Created by [@vriad](https://twitter.com/vriad)<br>
MIT License
</p>
