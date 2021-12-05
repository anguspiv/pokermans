import type { NextPage } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const User: NextPage = () => {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {session ? (
          <>
            Signed in as {session?.user?.email} <br />
            <button type="button" onClick={() => signOut()}>
              Sign out
            </button>
          </>
        ) : (
          <>
            Not Signed in <br />
            <button type="button" onClick={() => signIn()}>
              Sign in
            </button>
          </>
        )}
      </main>
    </div>
  );
};

export default User;
