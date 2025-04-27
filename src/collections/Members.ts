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
      name: "email",
      type: "email",
      required: true,
      defaultValue: "",
    },
    {
      name: "position",
      type: "text",
      required: true,
    },
    {
      name: "orderWithInGroup",
      type: "number",
      required: true,
      defaultValue: 0,
    },
    {
      name: "groupOrder",
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
