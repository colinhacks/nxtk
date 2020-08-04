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

Currently `nxtk` contains just a single utility: `fetch`. This utility uses infererence to reduce the boilerplate code required to implement strongly typed Next.js pages with data fetching via `getStaticProps` and `getServerSideProps`.

Here's how to use it:

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
    const props = { staticProp: 'World' };
    return { props };
  },
});
```

### A note on syntax

If this syntax looks unfamiliar, you can read about it [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions). Here is the functionally the same code written in a more conventional way:

```ts
const Fetcher = nxtk.fetch({
  server: async ctx => {
    const props = { serverSideProp: 'Hello' };
    return { props };
  },
  static: async ctx => {
    const props = { staticProp: 'World };
    return { props };
  },
});
```

### Reference

As you can see, `nxtk.fetch` accepts a single input of type

```ts
{
  server?: (ctx: GetServerSidePropsContext)=>Promise<{props: any}>,
  static?: (ctx: GetStaticPropsContext)=>Promise<{props: any}>
}
```

`server` corresponds to your `getServerSideProps` function and `static` corresponds to your `getStaticProps` implementation.

- Both functions should be async.
- The `ctx` input is automatically typed for you by `nxtk`.
- As specified by the Next.js docs, they should both return an object with a `props` property. Those props will be passed into your page component.

### Exporting the functions

Once you've instantiated your "fetcher", you need to export the `getServerSideProps` and `getStaticProps` properties from your file so Next.js can access them.

```tsx
export const getServerSideProps = Fetcher.getServerSideProps;
export const getStaticProps = Fetcher.getStaticProps;
```

### Typing your components

Here's the best part! `nxtk` **automatically infers** the return types of your fetcher functions and merges them together. So you can properly type your page components:

```tsx
type PageProps = typeof Fetcher['props'];
// { serverSideProp: string; staticProp: string };

export default function Home(props: PageProps) {
  props;
  return (
    <div>
      <p>{`${props.serverSideProp} ${props.staticProp}`} </p>
    </div>
  );
}
```

So there's no need to keep your `props` type in sync with your data fetching methods!

### Full example

A full sample page is available at [https://github.com/vriad/nxtk/blob/master/src/example.tsx](https://github.com/vriad/nxtk/blob/master/src/example.tsx).

## `nxtk.???`

If you have any other suggestions of how nxtk could make using Next.js and TypeScript more painless, create an issue! I hope to expand the scope of `nxtk` wherever pain points exist.

Created by [@vriad](https://twitter.com/vriad)<br>
MIT License
