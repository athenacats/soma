import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { Book } from "./bookModel";

@modelOptions({ schemaOptions: { timestamps: true } })
export class RatedBook {
  @prop({ required: true })
  public userId!: string;

  @prop({ required: true })
  public book!: Book;

  @prop({ required: true })
  public rating!: number;
}

export const RatedBookModel = getModelForClass(RatedBook);
