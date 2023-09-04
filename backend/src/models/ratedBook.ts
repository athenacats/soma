import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class RatedBook {
  @prop({ required: true })
  public userId!: string;

  @prop({ required: true })
  public bookId!: string;

  @prop({ required: true })
  public rating!: number;
}

export const RatedBookModel = getModelForClass(RatedBook);
