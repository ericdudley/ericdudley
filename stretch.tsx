import Layout from '@theme/Layout';
import React, { useEffect } from 'react';

export const STRETCH_URL = 'https://stretch.ericdudley.com';
export function redirectToStretch() {
  window.location.href = STRETCH_URL;
}

export default function RedirectToStretch(): React.ReactElement {
  useEffect(() => {
    setTimeout(() => {
      redirectToStretch();
    }, 1000);
  }, []);

  return (
    <Layout title="Redirect" wrapperClassName="p-8">
      <h1>
        Redirecting you to{' '}
        <a href={STRETCH_URL} target="_blank" rel="noopener noreferrer">
          {STRETCH_URL}
        </a>
        ...
      </h1>
    </Layout>
  );
}
