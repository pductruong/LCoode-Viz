import { Request, Response, NextFunction } from 'express';
import { TopicService } from '../services/TopicService';
import { ResponseBuilder } from '../utils/response';
import { AppError } from '../middleware/errorHandler';

export class TopicController {
  constructor(private service: TopicService) {}

  listTopics = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { category, search } = req.query;

      const filters = {
        category: category as string | undefined,
        searchQuery: search as string | undefined,
      };

      const topics = await this.service.filter(filters);
      ResponseBuilder.success(res, topics);
    } catch (error) {
      next(error);
    }
  };

  getTopic = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = req.params.id as string;
      const topic = await this.service.getById(id);

      if (!topic) {
        throw new AppError('Topic not found', 404, 'NOT_FOUND');
      }

      ResponseBuilder.success(res, topic);
    } catch (error) {
      next(error);
    }
  };

  searchTopics = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { q } = req.query;

      if (!q || typeof q !== 'string') {
        throw new AppError('Search query is required', 400, 'BAD_REQUEST');
      }

      const topics = await this.service.search(q);
      ResponseBuilder.success(res, topics);
    } catch (error) {
      next(error);
    }
  };

  getCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const categories = await this.service.getCategories();
      ResponseBuilder.success(res, categories);
    } catch (error) {
      next(error);
    }
  };

  createTopic = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const topic = await this.service.create(req.body);
      ResponseBuilder.success(res, topic, 201);
    } catch (error) {
      next(error);
    }
  };

  updateTopic = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = req.params.id as string;
      const topic = await this.service.update(id, req.body);
      ResponseBuilder.success(res, topic);
    } catch (error) {
      next(error);
    }
  };

  deleteTopic = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = req.params.id as string;
      await this.service.delete(id);
      ResponseBuilder.success(res, { message: 'Topic deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
