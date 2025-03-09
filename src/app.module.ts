import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectModule } from './project/project.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryProvider } from './cloudinary/cloudinary.provider';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BlogModule,
    MongooseModule.forRoot(
      'mongodb+srv://phamvanhaid512:haid5122003@cluster0.k98gj.mongodb.net/',
    ),
    ProjectModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
