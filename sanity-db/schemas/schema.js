import createSchema from "part:@sanity/base/schema-creator"
import schemaTypes from "all:part:@sanity/base/schema-type"

import userSchema from "./userSchema"
import bountySchema from "./bountySchema"
import commentSchema from "./commentSchema"

export default createSchema({
  name: "whale",
  types: schemaTypes.concat([userSchema, bountySchema, commentSchema]),
})
