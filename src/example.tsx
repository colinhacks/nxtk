import React from 'react';
import { nxtk } from '.';

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
export const getServerSideProps = Fetcher.getServerSideProps;
export const getStaticProps = Fetcher.getStaticProps;
export default function Home(props: typeof Fetcher['props']) {
  props; // { greeting: string; nested: { data: string } };

  return (
    <div>
      <p>{`${props.greeting} ${props.nested.data}`} </p>
    </div>
  );
}
