"use client";
import React from 'react';
import Giscus from '@giscus/react';

export default function GiscusComments() {
  return (
    <section className="giscus-comments">
      <Giscus
        repo="abstractalgorithms/abstractalgorithms.github.io"
        repoId="R_kgDOKqN8Lg"
        category="Q&A"
        categoryId="DIC_kwDOKqN8Ls4Cavqb"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="light"
        lang="en"
        loading="lazy"
      />
    </section>
  );
}
