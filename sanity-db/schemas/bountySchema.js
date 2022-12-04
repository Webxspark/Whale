export default {
  name: "bounty",
  type: "document",
  title: "Bounty",
  fields: [
    {
      name: "id",
      type: "string",
      title: "ID",
    },
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      name: "prize",
      type: "number",
      title: "Prize",
    },
    {
      name: "description",
      type: "string",
      title: "Description",
    },
    {
      name: "status",
      type: "boolean",
      title: "Status",
    },
    {
      name: "closedBy",
      type: "reference",
      title: "Closed By",
      to: [{ type: "user" }],
    },
    {
      name: "author",
      type: "reference",
      title: "Author",
      to: [{ type: "user" }],
    },
  ],
}
