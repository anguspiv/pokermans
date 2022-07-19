import Head from 'next/head';
import { useRouter } from 'next/router';
import PageHeader from '@components/layout/PageHeader';

const PlayerPage = () => {
  const { query } = useRouter();
  const { guid } = query;

  return (
    <>
      <Head>
        <title>Player</title>
      </Head>
      <PageHeader title={`Player ${guid}`} />
    </>
  );
};

export default PlayerPage;
