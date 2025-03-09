import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBlog, UpdateBlog } from 'src/dto/blog/blog.dto';
import { Blog } from 'src/schema/blog.schema';

@Injectable()
export class BlogService {
    constructor(@InjectModel(Blog.name) private blogModel:Model<Blog>) {}

    async getListBlog() {
        try {
            const result = await this.blogModel.find();
            return result;
        } catch (error) {
            throw error;
        }
    }


    async detailBlog(id:string) {
        try {
            const result = await this.blogModel.findById(id);
            return result;
        } catch (error) {
            throw error
        }
    }
    async createBlog(data:CreateBlog) :Promise<Blog> {
        try {
            const result = new this.blogModel(data);
            return await result.save();
        } catch(error){
            throw error;
        }
    }


    async updateBlog(id:string,data:UpdateBlog) :Promise<Blog> {
        try {
            const result = await  this.blogModel.findByIdAndUpdate(id,data)
            if (!data) {
                throw new Error("can't update");
              }
              return result;
        } catch (error) {
            throw error
        }
    }

    async deleteBlog(id:string) :Promise<Blog> {
        try {
            const result = await this.blogModel.findByIdAndDelete(id);
            if (!result) {
                throw new Error("error in deletion");
              }
              return result;
        } catch (error) {
            throw error
        }
    }
}
