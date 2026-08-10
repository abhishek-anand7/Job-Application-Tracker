import mongoose, { Schema, Document } from "mongoose";

// Board -> Columns -> JobApplications

export interface IBoard extends Document {
  name: string;
  userId: string;
  columns: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Template of a (creation of) Collection.
const BoardSchema = new Schema<IBoard>(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      index: true, //it is used on userId because we frequently query boards using userId. The index makes these searches faster. (Creates an index on a field so MongoDB can find matching data faster. Use it for fields that are frequently searched or filtered.)
    },
    columns: [
      {
        type: Schema.Types.ObjectId,
        ref: "Column",
      },
    ],
  },
  {
    timestamps: true,
    // And we're going to set timestamp to true. Now, what does timestamps equal to true do here? Well, if you notice when we defined our board schema, we didn't include the created at and updated at. That's because uh if we set timestamps to true, it's going to,  automatically add the created at and updated at field to every single document that is added on this without the need of doing anything else.
  }
);

export default mongoose.models.Board ||
  mongoose.model<IBoard>("Board", BoardSchema);