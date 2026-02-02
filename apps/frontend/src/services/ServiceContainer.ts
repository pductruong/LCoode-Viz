import { HttpClient, ProblemApiClient, TopicApiClient } from '@lcode-viz/api-client';
import { ProblemService } from './ProblemService';
import { TopicService } from './TopicService';
import { IProblemService } from './interfaces/IProblemService';
import { ITopicService } from './interfaces/ITopicService';

export class ServiceContainer {
  private static instance: ServiceContainer;

  private httpClient: HttpClient;
  private problemApiClient: ProblemApiClient;
  private topicApiClient: TopicApiClient;
  private problemService: IProblemService;
  private topicService: ITopicService;

  private constructor() {
    // Get API URL from environment or use default
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

    // Initialize HTTP client
    this.httpClient = new HttpClient(apiUrl);

    // Initialize API clients
    this.problemApiClient = new ProblemApiClient(this.httpClient);
    this.topicApiClient = new TopicApiClient(this.httpClient);

    // Initialize services with dependency injection
    this.problemService = new ProblemService(this.problemApiClient);
    this.topicService = new TopicService(this.topicApiClient);
  }

  static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }

  getProblemService(): IProblemService {
    return this.problemService;
  }

  getTopicService(): ITopicService {
    return this.topicService;
  }
}
