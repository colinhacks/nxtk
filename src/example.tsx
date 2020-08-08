import React from 'react';
import { nxtk } from '.';

const Fetcher = nxtk.fetch({
  async server(_ctx) {
    return { props: { greeting: 'Hello' } };
  },
  async static(_ctx) {
    return { props: { subject: 'World' } };
  },
});

export const getServerSideProps = Fetcher.getServerSideProps;
export const getStaticProps = Fetcher.getStaticProps;

export default function Home(props: typeof Fetcher['props']) {
  return <p>{`${props.greeting} ${props.subject}`} </p>;
}
