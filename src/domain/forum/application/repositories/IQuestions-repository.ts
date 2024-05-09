import { PaginationParams } from '@/core/repositories/pagination-params';
import { Question } from '@/domain/forum/enterprise/entities/question';

interface IQuestionRepository {
  findById(id: string): Promise<Question | undefined>;
  create(data: Question): Promise<void>;
  getBySlug(slug: string): Promise<Question | undefined>;
  delete(id: string): Promise<void>;
  update(data: Question): Promise<void>;
  listManyRecent({ page }: PaginationParams): Promise<Question[]>;
}

export { IQuestionRepository };
