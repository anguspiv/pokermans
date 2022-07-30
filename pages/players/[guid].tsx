import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import PageHeader from '@components/layout/PageHeader';
import { GET_PROFILE } from '@graphql/queries';
import { getImageUrl } from '@utils/image';
import { getFullName, getName } from '@utils/profile';
import logger from '@utils/logger';
import ProfileCard from '@components/account/ProfileCard';

const PlayerPage = () => {
  const [profile, setProfile] = useState<Profile>({});
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

  const breadcrumbLabels: { [key: string]: string } = {};

  if (guid) {
    breadcrumbLabels[`${guid}`] = name;
  }

  return (
    <>
      <Head>
        <title>Player {fullName}</title>
      </Head>
      <PageHeader title={`${fullName}`} breadcrumbLabels={breadcrumbLabels} />
      <ProfileCard
        firstName={profile?.firstName}
        lastName={profile?.lastName}
        nickname={profile?.nickname}
        image={getImageUrl(profile?.avatar || {})}
        bio={profile?.bio}
      />
    </>
  );
};

export default PlayerPage;
