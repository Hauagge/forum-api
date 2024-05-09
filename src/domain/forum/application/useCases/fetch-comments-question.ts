import { Either, right } from '@/core/either';
import { Question } from '../../enterprise/entities/question';
import { QuestionComments } from '../../enterprise/entities/question-comment';
import { IQuestionCommentsRepository } from '../repositories/IQuestionComments-repository';
import { PaginationParams } from '@/core/repositories/pagination-params';

interface IFetchCommentsQuestionQuestionUseCaseRequest {
  page: number;
  questionId: string;
}

type IGetCommentsQuestionUseCaseResponse = Either<
  null,
  {
    question: QuestionComments[];
  }
>;
class FetchCommentsQuestionUseCase {
  constructor(
    private commentsQuestionRepository: IQuestionCommentsRepository
  ) {}

  async execute({
    page,
    questionId,
  }: IFetchCommentsQuestionQuestionUseCaseRequest): Promise<IGetCommentsQuestionUseCaseResponse> {
    const question =
      await this.commentsQuestionRepository.fetchCommentsFromQuestion(
        questionId,
        { page }
      );

    return right({
      question,
    });
  }
}

export { FetchCommentsQuestionUseCase };
