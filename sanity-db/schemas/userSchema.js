export default {
  name: "user",
  type: "document",
  title: "User",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      name: "walletAddress",
      type: "string",
      title: "Wallet Address",
    },
    {
      name: "admin",
      type: "boolean",
      title: "Admin",
    },
    {
      name: "registered",
      type: "boolean",
      title: "Registered",
    },
  ],
}
