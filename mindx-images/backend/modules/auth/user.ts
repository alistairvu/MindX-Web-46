import mongoose from "mongoose"

interface UserSchemaInterface extends mongoose.Document {
  email: string
  password: string
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

UserSchema.index({
  email: 1,
})

export default mongoose.model<UserSchemaInterface>("user", UserSchema)
