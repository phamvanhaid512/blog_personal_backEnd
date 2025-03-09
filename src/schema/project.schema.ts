import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Project {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  logo: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
