import { Router } from 'express';
import { ProblemController } from '../controllers/problemController';
import { ProblemService } from '../services/ProblemService';
import { ProblemRepository } from '../repositories/ProblemRepository';

const router = Router();

// Dependency Injection
const problemRepository = new ProblemRepository();
const problemService = new ProblemService(problemRepository);
const problemController = new ProblemController(problemService);

// Routes
router.get('/', problemController.listProblems);
router.get('/search', problemController.searchProblems);
router.get('/categories', problemController.getCategories);
router.get('/:id', problemController.getProblem);
router.post('/', problemController.createProblem);
router.put('/:id', problemController.updateProblem);
router.delete('/:id', problemController.deleteProblem);

export default router;
