"use client";

import { cn } from "@/lib/utils";
import React from "react";

type Node = {
  type: string;
  format?: string;
  indent?: number;
  version: number;
  children?: Array<TextNode | ElementNode | InlineNode>;
  direction?: "ltr" | "rtl" | null;
};

type TextNode = {
  type: "text";
  text: string;
  format?: number;
  version: number;
  style?: string;
};

type ElementNode = {
  type: string;
  children?: Array<TextNode | ElementNode | InlineNode>;
  format?: string;
  version: number;
  indent?: number;
  direction?: "ltr" | "rtl" | null;
};

type InlineNode = {
  type: string;
  version: number;
  fields?: Record<string, never>;
  children?: Array<TextNode | ElementNode | InlineNode>;
};

type RichTextProps = {
  content: {
    root: Node;
  };
  className?: string;
};

const RichText: React.FC<RichTextProps> = ({ content, className }) => {
  if (!content || !content.root) {
    return null;
  }

  const renderNode = (
    node: Node | TextNode | ElementNode | InlineNode,
  ): React.ReactNode => {
    if (node.type === "text") {
      const textNode = node as TextNode;
      const text = textNode.text;

      // Handle formatting
      if (textNode.format === 1) {
        // Bold
        return <strong>{text}</strong>;
      } else if (textNode.format === 2) {
        // Italic
        return <em>{text}</em>;
      } else if (textNode.format === 4) {
        // Underline
        return <u>{text}</u>;
      } else if (textNode.format === 8) {
        // Strikethrough
        return <s>{text}</s>;
      } else if (textNode.format === 16) {
        // Code
        return <code>{text}</code>;
      } else if (textNode.format === 3) {
        // Bold + Italic
        return (
          <strong>
            <em>{text}</em>
          </strong>
        );
      } else {
        return text;
      }
    }

    if (node.type === "paragraph") {
      return (
        <p className="mb-4">
          {node.children?.map((child, i) => (
            <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
          ))}
        </p>
      );
    }

    if (node.type === "heading") {
      const level = (node as Node | ElementNode).format as string;

      if (level === "h1") {
        return (
          <h1 className="mb-4 text-3xl font-bold">
            {node.children?.map((child, i) => (
              <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
            ))}
          </h1>
        );
      } else if (level === "h2") {
        return (
          <h2 className="mb-3 text-2xl font-bold">
            {node.children?.map((child, i) => (
              <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
            ))}
          </h2>
        );
      } else if (level === "h3") {
        return (
          <h3 className="mb-3 text-xl font-bold">
            {node.children?.map((child, i) => (
              <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
            ))}
          </h3>
        );
      } else {
        return (
          <h4 className="mb-2 text-lg font-bold">
            {node.children?.map((child, i) => (
              <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
            ))}
          </h4>
        );
      }
    }

    if (node.type === "list") {
      const listType = (node as Node | ElementNode).format;
      if (listType === "ul") {
        return (
          <ul className="mb-4 list-disc pl-6">
            {node.children?.map((child, i) => (
              <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
            ))}
          </ul>
        );
      } else {
        return (
          <ol className="mb-4 list-decimal pl-6">
            {node.children?.map((child, i) => (
              <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
            ))}
          </ol>
        );
      }
    }

    if (node.type === "listitem") {
      return (
        <li>
          {node.children?.map((child, i) => (
            <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
          ))}
        </li>
      );
    }

    if (node.type === "quote") {
      return (
        <blockquote className="mb-4 border-l-4 border-gray-300 pl-4 italic">
          {node.children?.map((child, i) => (
            <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
          ))}
        </blockquote>
      );
    }

    if (node.type === "link") {
      const linkNode = node as InlineNode;
      const url = linkNode.fields?.url;

      return (
        <a href={url} className="text-blue-600 hover:underline">
          {node.children?.map((child, i) => (
            <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
          ))}
        </a>
      );
    }

    // Default case: render children
    return (
      <>
        {"children" in node &&
          node.children?.map((child, i) => (
            <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
          ))}
      </>
    );
  };

  return (
    <div className={cn("prose max-w-none", className)}>
      {renderNode(content.root)}
    </div>
  );
};

export default RichText;
