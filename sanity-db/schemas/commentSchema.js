export default {
  name: "comments",
  type: "document",
  title: "Comments",
  fields: [
    {
      name: "content",
      type: "string",
      title: "Content",
    },
    {
      name: "upvote",
      type: "number",
      title: "Upvote",
    },
    {
      name: "downvote",
      type: "number",
      title: "Downvote",
    },
    {
      name: "author",
      type: "reference",
      title: "Author",
      to: [{ type: "user" }],
    },
    {
      name: "bounty",
      type: "reference",
      title: "Bounty",
      to: [{ type: "bounty" }],
    },
  ],
}
