import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlog, UpdateBlog } from 'src/dto/blog/blog.dto';
import express, { Request, Response } from 'express';
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('/listBlog')
  async getListBlog(@Res() res: Response) {
    const result = await this.blogService.getListBlog();
    res.status(200).json(result);
  }

  @Get('/details/:id')
  async detailBlog(@Param('id') id: string, @Res() res: Response) {
    const result = await this.blogService.detailBlog(id);
    res.status(200).json(result);
  }
  @Post('/create')
  async create(@Body() body: CreateBlog, @Res() res: Response) {
    const data = body;
    try {
      const result = await this.blogService.createBlog(data);
      res.status(200).json(result);
    } catch (error) {
      throw error;
    }
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateBlog,
    @Res() res: Response,
  ) {
    const result = await this.blogService.updateBlog(id, body);
    res.status(200).json(result);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.blogService.deleteBlog(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
