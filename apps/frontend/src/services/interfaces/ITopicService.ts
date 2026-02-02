import { Topic } from '@lcode-viz/types/domain';
import { TopicFilterCriteria } from '@lcode-viz/types/filters';
import { IDataService } from './IDataService';

export interface ITopicService extends IDataService<Topic> {
  filter(criteria: TopicFilterCriteria): Promise<Topic[]>;
  getByCategory(category: string): Promise<Topic[]>;
  getCategories(): Promise<string[]>;
}
