import { Request, Response, NextFunction } from 'express';
import { ProblemService } from '../services/ProblemService';
import { ResponseBuilder } from '../utils/response';
import { AppError } from '../middleware/errorHandler';

export class ProblemController {
  constructor(private service: ProblemService) {}

  listProblems = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { difficulty, categories, search } = req.query;

      const filters = {
        difficulty: difficulty ? (difficulty as string).split(',') : undefined,
        categories: categories ? (categories as string).split(',') : undefined,
        searchQuery: search as string | undefined,
      };

      const problems = await this.service.filter(filters);
      ResponseBuilder.success(res, problems);
    } catch (error) {
      next(error);
    }
  };

  getProblem = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = req.params.id as string;
      const problem = await this.service.getById(id);

      if (!problem) {
        throw new AppError('Problem not found', 404, 'NOT_FOUND');
      }

      ResponseBuilder.success(res, problem);
    } catch (error) {
      next(error);
    }
  };

  searchProblems = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { q } = req.query;

      if (!q || typeof q !== 'string') {
        throw new AppError('Search query is required', 400, 'BAD_REQUEST');
      }

      const problems = await this.service.search(q);
      ResponseBuilder.success(res, problems);
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

  createProblem = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const problem = await this.service.create(req.body);
      ResponseBuilder.success(res, problem, 201);
    } catch (error) {
      next(error);
    }
  };

  updateProblem = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = req.params.id as string;
      const problem = await this.service.update(id, req.body);
      ResponseBuilder.success(res, problem);
    } catch (error) {
      next(error);
    }
  };

  deleteProblem = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = req.params.id as string;
      await this.service.delete(id);
      ResponseBuilder.success(res, { message: 'Problem deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
