import { Topic } from '../../types/domain/Topic';
import { TopicFilterCriteria } from '../../types/filters/FilterCriteria';
import { IDataService } from './IDataService';

export interface ITopicService extends IDataService<Topic> {
  filter(criteria: TopicFilterCriteria): Promise<Topic[]>;
  getByCategory(category: string): Promise<Topic[]>;
  getCategories(): Promise<string[]>;
}
