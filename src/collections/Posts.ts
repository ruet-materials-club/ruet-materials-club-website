import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "content",
      type: "richText",
      // Pass the Lexical editor here and override base settings as necessary
      editor: lexicalEditor({}),
    },
  ],
};
