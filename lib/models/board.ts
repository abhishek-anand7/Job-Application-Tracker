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
  }
);

export default mongoose.models.Board ||
  mongoose.model<IBoard>("Board", BoardSchema);