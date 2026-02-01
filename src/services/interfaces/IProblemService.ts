import { Problem } from '../../types/domain/Problem';
import { FilterCriteria } from '../../types/filters/FilterCriteria';
import { IDataService } from './IDataService';

export interface IProblemService extends IDataService<Problem> {
  filter(criteria: FilterCriteria): Promise<Problem[]>;
  getByCategory(category: string): Promise<Problem[]>;
  getByDifficulty(difficulty: string): Promise<Problem[]>;
  getCategories(): Promise<string[]>;
}
