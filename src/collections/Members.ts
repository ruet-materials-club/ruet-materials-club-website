import type { CollectionConfig } from "payload";

export const Members: CollectionConfig = {
  slug: "members",
  admin: {
    useAsTitle: "fullName",
  },
  fields: [
    {
      name: "fullName",
      type: "text",
      required: true,
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "position",
      type: "text",
      required: true,
    },
    {
      name: "displayOrder",
      type: "number",
      required: true,
      defaultValue: 0,
    },
    {
      name: "commitee",
      type: "number",
      required: true,
      defaultValue: 0,
    },
  ],
};
