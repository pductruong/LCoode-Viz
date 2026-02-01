import { Router } from 'express';
import { TopicController } from '../controllers/topicController';
import { TopicService } from '../services/TopicService';
import { TopicRepository } from '../repositories/TopicRepository';

const router = Router();

// Dependency Injection
const topicRepository = new TopicRepository();
const topicService = new TopicService(topicRepository);
const topicController = new TopicController(topicService);

// Routes
router.get('/', topicController.listTopics);
router.get('/search', topicController.searchTopics);
router.get('/categories', topicController.getCategories);
router.get('/:id', topicController.getTopic);
router.post('/', topicController.createTopic);
router.put('/:id', topicController.updateTopic);
router.delete('/:id', topicController.deleteTopic);

export default router;
