import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: [
      "title",
      "slug",
      "featuredImage",
      "publishedDate",
      "status",
      "category",
    ],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            // If no slug is provided, auto-generate one from the title
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "");
            }
            return value;
          },
        ],
      },
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description:
          "This image will be used as the featured image for the post",
      },
    },
    {
      name: "publishedDate",
      type: "date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "status",
      type: "select",
      options: [
        {
          label: "Draft",
          value: "draft",
        },
        {
          label: "Published",
          value: "published",
        },
      ],
      defaultValue: "draft",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "category",
      type: "select",
      options: [
        {
          label: "News",
          value: "News",
        },
        {
          label: "MatChat",
          value: "MatChat",
        },
      ],
      defaultValue: "News",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      admin: {
        description: "Brief summary of the post content",
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          // Add any additional features you want to enable
        ],
      }),
    },
    {
      name: "tags",
      type: "array",
      admin: {
        position: "sidebar",
      },
      fields: [
        {
          name: "tag",
          type: "text",
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidate],
    afterDelete: [revalidate],
  },
};

async function revalidate() {
  const paths = ["/blog", "/posts"];
  try {
    for (const path of paths) {
      await fetch(`${process.env.BASE_URL}/revalidate?path=${path}`);
    }
  } catch (err) {
    console.error(
      "Revalidate failed:",
      err instanceof Error ? err.message : err,
    );
  }
}
