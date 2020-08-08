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

This utility reduces the boilerplate required to implement pages with data fetching. It uses type inference to detect the return type of `getStaticProps`, `getServerSideProps`, or both. Then it merges the types so you can trivially add strong typing to your component props.

### Defining fetch functions

```tsx
// pages/yourpage.tsx

import React from 'react';
import { nxtk } from 'nxtk';

const Fetcher = nxtk.fetch({
  async server(ctx) {
    // ctx = GetServerSidePropsContext
    const props = { serverSideProp: 'Hello' };
    return { props };
  },
  async static(ctx) {
    // ctx = GetStaticPropsContext
    const props = { staticProp: 'World' };
    return { props };
  },
});
```

The `ctx` inputs are automatically typed for you.

<!-- ### A note on syntax

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
- As specified by the Next.js docs, they should both return an object with a `props` property. Those props will be passed into your page component. -->

<!-- ### Exporting the functions -->

After creating your "fetcher", export its `getServerSideProps` and `getStaticProps` properties so Next.js can access them.

```tsx
export const getServerSideProps = Fetcher.getServerSideProps;
export const getStaticProps = Fetcher.getStaticProps;
```

### Inferring prop types!

The best part: `nxtk` automatically **infers** the return types of your fetcher functions and **merges** them together. So you can properly type your page components:

```tsx
type InferredProps = typeof Fetcher['props']; // { serverSideProp: string; staticProp: string };

export default function Home(props: InferredProps) {
  props;
  return (
    <div>
      <p>{`${props.serverSideProp} ${props.staticProp}`} </p>
    </div>
  );
}
```

As you can see, the return type of `getServerSideProps` (`{ serverSideProp: string}`) and `getStaticProps` (`{ staticProp: string }`) are inferred and merged into `{ serverSideProp: string; staticProp: string }`. You can access this typing with `typeof Fetcher['props']`.

This may not look like much with a simple example, but imagine you are doing a serious of complex database queries using a type-safe ORM like TypeORM or Prisma. No matter how compicated your fetching logic gets, `nxtk` can infer it. No need to keep your component `props` in sync with your fetching logic!

### Full example

A full sample page is available at [https://github.com/vriad/nxtk/blob/master/src/example.tsx](https://github.com/vriad/nxtk/blob/master/src/example.tsx).

## `nxtk.api`

This is a helper function for defining API routes.

```tsx
// /api/hello.ts
import { nxtk } from 'nxtk';

export default nxtk.api((req, res) => {
  if (req.method !== 'POST') return res.status(200).json({ name: 'unsupported' });
  res.status(200).json({ message: 'yay post!' });
});
```

## `nxtk.???`

If you have any other suggestions of how nxtk could make using Next.js and TypeScript more painless, create an issue! I hope to expand the scope of `nxtk` wherever pain points exist.

Created by [@vriad](https://twitter.com/vriad)<br>
MIT License
