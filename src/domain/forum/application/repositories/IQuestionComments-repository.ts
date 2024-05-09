import { PaginationParams } from '@/core/repositories/pagination-params';
import { QuestionComments } from '../../enterprise/entities/question-comment';

interface IQuestionCommentsRepository {
  findById(id: string): Promise<QuestionComments | undefined>;
  create(data: QuestionComments): Promise<void>;
  delete(data: QuestionComments): Promise<void>;
  fetchCommentsFromQuestion(
    answerId: string,
    params: PaginationParams
  ): Promise<QuestionComments[]>;
}

export { IQuestionCommentsRepository };
