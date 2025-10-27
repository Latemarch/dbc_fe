"use client";

import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import type { ReactNode } from "react";

interface MarkdownContainerProps {
  content: string;
  className?: string;
}

export default function MarkdownContainer({
  content,
  className = "",
}: MarkdownContainerProps) {
  const components: Partial<Components> = {
    // Custom rendering for code blocks
    code(props) {
      return <code {...props} />;
    },
    // Custom rendering for pre blocks
    pre({ children }: { children?: ReactNode }) {
      return <pre className="code-block">{children}</pre>;
    },
    // Custom rendering for paragraphs
    p({ children }: { children?: ReactNode }) {
      return <p className="mb-4 leading-relaxed">{children}</p>;
    },
    // Custom rendering for headings
    h1({ children }: { children?: ReactNode }) {
      return <h1 className="text-2xl font-bold mb-3 mt-6">{children}</h1>;
    },
    h2({ children }: { children?: ReactNode }) {
      return <h2 className="text-xl font-bold mb-2 mt-5">{children}</h2>;
    },
    h3({ children }: { children?: ReactNode }) {
      return <h3 className="text-lg font-semibold mb-2 mt-4">{children}</h3>;
    },
    h4({ children }: { children?: ReactNode }) {
      return <h4 className="text-base font-semibold mb-2 mt-3">{children}</h4>;
    },
    // Custom rendering for lists
    ul({ children }: { children?: ReactNode }) {
      return <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>;
    },
    ol({ children }: { children?: ReactNode }) {
      return <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>;
    },
    li({ children }: { children?: ReactNode }) {
      return <li className="leading-relaxed">{children}</li>;
    },
    // Custom rendering for blockquotes
    blockquote({ children }: { children?: ReactNode }) {
      return (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-700 dark:text-gray-300">
          {children}
        </blockquote>
      );
    },
    // Custom rendering for links
    a({ href, children }: { href?: string; children?: ReactNode }) {
      return (
        <a
          href={href}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    },
    // Custom rendering for tables
    table({ children }: { children?: ReactNode }) {
      return (
        <div className="overflow-x-auto my-4">
          <table className="min-w-full border-collapse border border-gray-300">
            {children}
          </table>
        </div>
      );
    },
    th({ children }: { children?: ReactNode }) {
      return (
        <th className="border border-gray-300 px-4 py-2 bg-gray-100 dark:bg-gray-700 font-semibold">
          {children}
        </th>
      );
    },
    td({ children }: { children?: ReactNode }) {
      return <td className="border border-gray-300 px-4 py-2">{children}</td>;
    },
    // Custom rendering for horizontal rules
    hr(props) {
      return <hr className="my-6 border-gray-300" {...props} />;
    },
  };

  return (
    <div className={`markdown-container ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>

      <style jsx global>{`
        .markdown-container {
          max-width: 100%;
          line-height: 1.75;
        }

        .markdown-container code {
          font-family: "Fira Code", "Courier New", monospace;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          background-color: rgba(128, 128, 128, 0.15);
          font-size: 0.875em;
        }

        .markdown-container .code-block {
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          background-color: #24292e;
          border: 1px solid rgba(128, 128, 128, 0.3);
          margin: 1rem 0;
        }

        .markdown-container .code-block code {
          background-color: transparent;
          padding: 0;
          font-size: 0.875rem;
          color: inherit;
        }

        .markdown-container h1,
        .markdown-container h2,
        .markdown-container h3,
        .markdown-container h4 {
          scroll-margin-top: 1rem;
        }

        .markdown-container img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }

        .markdown-container strong {
          font-weight: 600;
          color: var(--foreground);
        }

        .markdown-container em {
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
