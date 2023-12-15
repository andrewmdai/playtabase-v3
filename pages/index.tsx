import Main from './main';
import Layout from '../components/layout';
import { AppProvider } from '../components/appContext';
import clientPromise from '../lib/mongodb';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

type ConnectionStatus = {
  isConnected: boolean;
};

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise;

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <AppProvider>
      <Layout>
        <Main />
      </Layout>
    </AppProvider>
  );
}
