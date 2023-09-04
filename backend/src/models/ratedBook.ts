import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { User } from "./userModel";
import { Book } from "./bookModel";

@modelOptions({ schemaOptions: { timestamps: true } })
export class RatedBook {
  @prop({ ref: () => User, required: true })
  public user!: User;
  @prop({ ref: () => Book, required: true })
  public book!: Book;
  @prop({ required: true })
  public rating!: number;
}

export const RatedBookModel = getModelForClass(RatedBook);
