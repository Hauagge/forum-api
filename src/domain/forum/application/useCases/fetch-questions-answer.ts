import { Either, right } from '@/core/either';
import { Answer } from '../../enterprise/entities/answer';
import { Question } from '../../enterprise/entities/question';
import { IAnswerRepository } from '../repositories/IAnswer-repository';
import { PaginationParams } from '@/core/repositories/pagination-params';

interface IFetchQuestionAnswerUseCaseRequest {
  page: number;
  questionId: string;
}

type IGetQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer[];
  }
>;
class FestRecentAnswerUseCase {
  constructor(private questionRepository: IAnswerRepository) {}

  async execute({
    page,
    questionId,
  }: IFetchQuestionAnswerUseCaseRequest): Promise<IGetQuestionUseCaseResponse> {
    const answer = await this.questionRepository.listManyByQuestionId(
      questionId,
      { page }
    );

    return right({
      answer,
    });
  }
}

export { FestRecentAnswerUseCase };
