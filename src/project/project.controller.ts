import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  Put,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from 'src/schema/project.schema';
import { CreateProject, UpdateProject } from 'src/dto/project/project.dto';
import express, { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('/listProject')
  async listProject(@Res() res: Response) {
    const result = await this.projectService.getListProject();
    res.status(200).json(result);
  }

  @Get('/detail/:id')
  async detailProject(@Param('id') id: string, @Res() res: Response) {
    const result = await this.projectService.getDetailProject(id);
    res.status(200).json(result);
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  async createProject(
    @Body() data: CreateProject,
    @Res() res: Response,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    try {
      const result = await this.projectService.createProject(data, file);
      res.status(200).json(result);
    } catch (error) {
      throw error;
    }
  }

  @Put('/update/:id')
  async updateProject(
    @Param('id') id: string,
    @Body() data: UpdateProject,
    @Res() res: Response,
  ) {
    try {
      const result = await this.projectService.updateProject(id, data);
      res.status(200).json(result);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const result = await this.projectService.deteleProject(id);
    res.status(200).json(result);
  }
}
