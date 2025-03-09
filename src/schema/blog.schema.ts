import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Blog {
    @Prop()
    title:string;

    @Prop()
    content:string;

    @Prop()
    logo:string;

    @Prop()
    date:string
}

export const BlogSchema = SchemaFactory.createForClass(Blog);