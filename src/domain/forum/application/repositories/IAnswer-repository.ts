import { PaginationParams } from '@/core/repositories/pagination-params';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

interface IAnswerRepository {
  create(data: Answer): Promise<void>;
  findById(id: string): Promise<Answer | undefined>;
  delete(id: string): Promise<void>;
  update(data: Answer): Promise<void>;
  listManyByQuestionId(
    questionId: string,
    params: PaginationParams
  ): Promise<Answer[]>;
}

export { IAnswerRepository };
