import { Problem } from '@lcode-viz/types/domain';
import { FilterCriteria } from '@lcode-viz/types/filters';
import { IDataService } from './IDataService';

export interface IProblemService extends IDataService<Problem> {
  filter(criteria: FilterCriteria): Promise<Problem[]>;
  getByCategory(category: string): Promise<Problem[]>;
  getByDifficulty(difficulty: string): Promise<Problem[]>;
  getCategories(): Promise<string[]>;
}
