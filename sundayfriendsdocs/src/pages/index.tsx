import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className={styles["title"]}>Sunday Friends Documentation</h1>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main className={styles["mainContainer"]}>
        {/* <HomepageFeatures /> */}
        <div className={styles["homepageContainer"]}>
          <img src={require('../../assets/sundayFriendsFoundation.jpeg').default} className={styles["image"]}></img>
          <div>A guide to the admin (web) and family (mobile) applications developed with Expo, React Native, and Firebase, built for the Sunday Friends Foundation.</div>
          <div>Code</div>
          <div>The code for this documentation can be found in the web application github under the sundayfriendsdocs folder. It's built with Docusaurus and hosted by Netlify.</div>
          <div>Contact</div>
          <div>Contact Jacob Kim at jacobjk01@berkeley.edu for any questions about the project.</div>
          <div>The Team:</div>
          <div></div>
        </div>
      </main>
    </Layout>
  );
}
