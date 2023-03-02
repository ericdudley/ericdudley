import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { CustomFields } from '@site/docusaurus';
import mePng from '@site/static/img/me.png';

import Image from '@theme/IdealImage';
import Layout from '@theme/Layout';
import cx from 'classnames';
import React, { useEffect } from 'react';
import { useWindowSize } from 'usehooks-ts';
import { Breakpoints } from '../utils/constants';
import { useRandomText } from '../utils/hooks';
import { redirectToStretch } from './stretch';

function LineItem(props: {
  className?: string;
  indent: number;
  sections: {
    text: string;
    link?: string;
  }[];
}): React.ReactElement {
  const { width } = useWindowSize();
  return (
    <p
      className={cx('text-2xl', props.className)}
      style={{
        textIndent: width > Breakpoints.sm ? `${props.indent}rem` : '0',
      }}
    >
      {props.sections.map((section, index) => {
        const { text, link } = section;

        const linkText = useRandomText(text);

        return link ? (
          <a
            className="w-fit text-3xl"
            key={index}
            href={link}
            target={link.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
          >
            {linkText}
          </a>
        ) : (
          text
        );
      })}
    </p>
  );
}

export default function Home(): React.ReactElement {
  const { siteConfig } = useDocusaurusContext();
  const { links } = siteConfig.customFields as unknown as CustomFields;

  useEffect(() => {
    if (window.location.hash === '#stretch') {
      redirectToStretch();
    }
  });

  const name = useRandomText('Eric');

  return (
    <Layout description="Description will go into a meta tag in <head />">
      <Image
        className="w-64 h-64 mx-auto my-4 opacity-0 animate-[fadein_1s_ease-in-out_0.25s_forwards]"
        img={mePng}
        alt="Eric's profile picture"
      />
      <main className="m-x-auto flex flex-col self-center max-w-lg animate-[fadein_0.5s_ease-in-out_0s_forwards]">
        <h1 className="rainbow-background p-4 text-center text-6xl">
          Hello, I'm{' '}
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono"
          >
            {name}
          </a>
          .
        </h1>
        <div className="px-4">
          <LineItem
            indent={0}
            sections={[
              { text: 'I write ' },
              { text: 'code', link: links.github },
              { text: '.' },
            ]}
          />
          <LineItem
            indent={2}
            sections={[
              { text: 'I take ' },
              { text: 'pictures', link: links.instagram },
              { text: '.' },
            ]}
          />
          <LineItem
            indent={4}
            sections={[
              { text: 'I make ' },
              { text: 'music', link: links.soundcloud },
              { text: ',' },
            ]}
          />
          <LineItem
            indent={6}
            sections={[
              { text: 'and I ' },
              { text: 'write sometimes', link: '/blog' },
              { text: '.' },
            ]}
          />
        </div>
      </main>
    </Layout>
  );
}
