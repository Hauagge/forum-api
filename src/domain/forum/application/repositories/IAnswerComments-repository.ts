import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswerComments } from '../../enterprise/entities/answer-comment';

interface IAnswerCommentsRepository {
  create(data: AnswerComments): Promise<void>;
  delete(data: AnswerComments): Promise<void>;
  findById(id: string): Promise<AnswerComments | undefined>;
  fetchCommentsFromAnswer(
    answerId: string,
    params: PaginationParams
  ): Promise<AnswerComments[]>;
}

export { IAnswerCommentsRepository };
