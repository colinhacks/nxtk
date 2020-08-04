import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';

export namespace nxtk {
  type getServerSideProps<T> = (ctx: GetServerSidePropsContext) => Promise<{ props: T }>;
  const getServerSideProps = <T>(func: getServerSideProps<T>) => func;

  type getStaticProps<T> = (ctx: GetStaticPropsContext) => Promise<{ props: T }>;
  const getStaticProps = <T>(func: getStaticProps<T>) => func;

  export type getters<A, B> = Partial<{
    server: getServerSideProps<A>;
    static: getStaticProps<B>;
  }>;

  export const fetch = <C extends getters<any, any>>(args: C) => {
    return class NextConfig {
      static props: props<
        C['server'] extends (...args: any[]) => Promise<{ props: any }> ? C['server'] : () => Promise<{ props: {} }>,
        C['static'] extends (...args: any[]) => Promise<{ props: any }> ? C['static'] : () => Promise<{ props: {} }>
      >;
      static getServerSideProps = args.server;
      static getStaticProps = args.static;
    };
  };

  export type unwrapReturnedPromiseProps<T extends (...args: any[]) => Promise<{ props: any }>> = T extends (
    ...args: any[]
  ) => Promise<{ props: infer U }>
    ? U
    : {};

  export type identity<T> = T;
  export type flatten<T> = identity<{ [k in keyof T]: T[k] }>;
  export type props<
    A extends (...args: any[]) => Promise<{ props: any }>,
    B extends (...args: any[]) => Promise<{ props: any }> = () => Promise<{
      props: {};
    }>
  > = flatten<unwrapReturnedPromiseProps<A> & unwrapReturnedPromiseProps<B>>;
}
