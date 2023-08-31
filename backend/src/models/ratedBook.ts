import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { User } from "./userModel";
import { Book } from "./bookModel";

@modelOptions({ schemaOptions: { timestamps: true } })
export class RatedBook {
  @prop({ required: true })
  public user!: User;
  @prop({ required: true })
  public book!: Book;
  @prop({ required: true })
  public rating!: number;
}

export const RatedBookModel = getModelForClass(RatedBook);
