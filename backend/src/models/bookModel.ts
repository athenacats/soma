import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class Book {
  public _id?: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public image!: string;

  @prop({ required: true })
  public author!: string;

  @prop({ required: true })
  public rating!: number;

  @prop({ required: true, default: false })
  public favorite!: boolean;

  @prop({ required: true })
  public isbn!: string;

  @prop({ required: true })
  public yourRating!: number;

  @prop({ required: true })
  public pages!: number;

  @prop()
  public description?: string;

  @prop({ required: true })
  public slugName!: string;

  @prop({ required: true })
  public slugAuthor!: string;
}

export const BookModel = getModelForClass(Book);
