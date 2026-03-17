import React from 'react';
import {
  PortableText as PortableTextReact,
  PortableTextComponents,
  PortableTextComponentProps,
  PortableTextMarkComponentProps,
} from '@portabletext/react';

import { urlFor, SanityImage } from './sanity';

type Props = {
  value: any[];
};

// Process text that contains literal **bold** markdown syntax
function processMarkdownBold(text: string): React.ReactNode[] {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="font-semibold text-foreground">{part}</strong> : part
  );
}

function processChildren(children: React.ReactNode): React.ReactNode {
  if (typeof children === 'string') {
    if (children.includes('**')) {
      return <>{processMarkdownBold(children)}</>;
    }
    return children;
  }
  if (Array.isArray(children)) {
    return children.map((child, i) =>
      typeof child === 'string' && child.includes('**')
        ? <span key={i}>{processMarkdownBold(child)}</span>
        : child
    );
  }
  return children;
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }: PortableTextComponentProps<SanityImage>) => {
      if (!value?.asset?._ref) return null;

      return (
        <figure className="my-10">
          <img
            alt={value.alt || ' '}
            loading="lazy"
            className="rounded-lg max-w-full h-auto shadow-lg"
            src={urlFor(value).width(800).url() || ''}
          />
          {value.alt && value.alt.trim() !== '' && (
            <figcaption className="mt-3 text-sm text-center text-muted-foreground italic">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }: PortableTextMarkComponentProps<{ _type: 'link'; href: string }>) => {
      const href = value?.href || '#';
      const rel = !href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a
          href={href}
          rel={rel}
          className="text-primary hover:text-primary/80 underline underline-offset-2 decoration-primary/30 hover:decoration-primary/60 font-medium transition-all duration-200"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-foreground/90">
        {children}
      </em>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-foreground/90">
        {children}
      </code>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-10 mb-6 leading-tight font-secondary">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-semibold text-foreground mt-10 mb-5 leading-tight font-secondary">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-semibold text-foreground mt-8 mb-4 leading-snug font-secondary">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-medium text-foreground mt-6 mb-3 leading-snug">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-6 text-[1.1rem] md:text-[1.15rem] leading-[1.85] text-foreground/85 dark:text-foreground/80 break-words">
        {processChildren(children)}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary/40 pl-6 py-3 my-8 italic text-foreground/80 bg-muted/10 rounded-r-lg text-[1.1rem] leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 my-6 space-y-3 text-foreground/85 dark:text-foreground/80 text-[1.05rem]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 my-6 space-y-3 text-foreground/85 dark:text-foreground/80 text-[1.05rem]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="leading-[1.8] break-words pl-1">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="leading-[1.8] break-words pl-1">
        {children}
      </li>
    ),
  },
};

export function PortableText({ value }: Props) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none font-body">
      <PortableTextReact value={value} components={components} />
    </div>
  );
}