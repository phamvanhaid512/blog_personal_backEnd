import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProject, UpdateProject } from 'src/dto/project/project.dto';
import { Project } from 'src/schema/project.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async getListProject(): Promise<Project[]> {
    try {
      const result = await this.projectModel.find();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getDetailProject(id: string): Promise<Project> {
    try {
      const result = await this.projectModel.findById(id);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async createProject(
    data: CreateProject,
    file?: Express.Multer.File,
  ): Promise<Project> {
    try {
      const folder = 'Blog/projects';
      const logoUrl = file
        ? await this.cloudinaryService.uploadFile(file, folder)
        : null;
      console.log('Logo URL:', logoUrl); // Debug giá trị trước khi lưu

      const result = new this.projectModel({
        ...data,
        logo: logoUrl.url,
      });
      return result.save();
    } catch (error) {
      throw error;
    }
  }

  async updateProject(id: string, data: UpdateProject): Promise<Project> {
    try {
      const result = await this.projectModel.findByIdAndUpdate(id, data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deteleProject(id: string): Promise<Project> {
    try {
      const result = this.projectModel.findByIdAndDelete(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
