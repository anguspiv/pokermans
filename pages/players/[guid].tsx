import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import PageHeader from '@components/layout/PageHeader';
import { GET_PROFILE } from '@graphql/queries';
import { getFullName, getName } from '@utils/profile';
import logger from '@utils/logger';

const PlayerPage = () => {
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { query } = useRouter();
  const { guid } = query;
  const { data, loading, error } = useQuery(GET_PROFILE, {
    variables: { input: { id: guid } },
  });

  useEffect(() => {
    if (data) {
      setProfile(data?.profile);
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (error) {
      logger.error(error);
    }
  }, [error]);

  const fullName = getFullName(profile);
  const name = getName(profile);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Player {fullName}</title>
      </Head>
      <PageHeader
        title={`${fullName}`}
        breadcrumbLabels={{
          [guid]: name,
        }}
      />
    </>
  );
};

export default PlayerPage;
