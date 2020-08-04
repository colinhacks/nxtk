<h2 align="center">nxtk</h1>
<p align="center">
  TypeScript utilities for Next.js
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

## Importing

```tsx
import { nxtk } from 'nxtk';
```

## `nxtk.fetch`

Currently `nxtk` contains just a single utility: `fetch`. (If you have ideas for other utilities open an issue!)

This utility uses type infererence to reduce the boilerplate code required to implement strongly typed Next.js pages with data fetching via `getStaticProps` and `getServerSideProps`.

It accepts a single input of type:

```ts
{
  server?: (ctx: GetServerSidePropsContext)=>Promise<{props: any}>,
  static?: (ctx: GetStaticPropsContext)=>Promise<{props: any}>
}
```

As you might have guessed, `server` corresponds to your `getServerSideProps` function and `static` corresponds to your `getStaticProps` implementation.

- Both functions should be async.
- The `ctx` input is automatically typed for you by `nxtk`.
- As specified by the Next.js docs, they should both return an object with a `props` property. Those props will be passed into your page component.

Here's a usage example:

```tsx
// pages/yourpage.tsx

import React from 'react';
import { nxtk } from 'nxtk';

const Fetcher = nxtk.fetch({
  async server(ctx) {
    ctx; // GetServerSidePropsContext
    const props = { greeting: 'Hello' };
    return { props };
  },
  async static(ctx) {
    ctx; // GetStaticPropsContext
    const props = { nested: { data: 'World' } };
    return { props };
  },
});
```

If this syntax looks unfamiliar, you can read about it [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions). Here is the functionally the same code written in a more conventional way:

```ts
const Fetcher = nxtk.fetch({
  server: async ctx => {
    const props = { greeting: 'Hello' };
    return { props };
  },
  static: async ctx => {
    const props = { nested: { data: 'World' } };
    return { props };
  },
});
```

### Exporting the functions

Once you've instantiated your "fetcher", you need to export the `getServerSideProps` and `getStaticProps` properties like so:

```tsx
export const getServerSideProps = Fetcher.getServerSideProps;
export const getStaticProps = Fetcher.getStaticProps;
```

### Typing your components

Here's the best part! `nxtk` automatically infers the return types of your fetcher functions and merges them together. So you can properly type your page components super easily:

```tsx
type PageProps = typeof Fetcher['props'];
// { greeting: string; nested: { data: string } };

export default function Home(props: PageProps) {
  props;
  return (
    <div>
      <p>{`${props.greeting} ${props.nested.data}`} </p>
    </div>
  );
}
```

### Full example

The full code of the page implemented above is available at [https://github.com/vriad/nxtk/blob/master/src/example.tsx](https://github.com/vriad/nxtk/blob/master/src/example.tsx).

## `nxtk.???`

If you have any other suggestions of how nxtk could make using Next.js and TypeScript more painless, create an issue! I hope to expand the scope of `nxtk` wherever pain points exist.

Created by [@vriad](https://twitter.com/vriad)<br>
MIT License
