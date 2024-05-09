import { Either, right } from '@/core/either';
import { Answer } from '../../enterprise/entities/answer';
import { AnswerComments } from '../../enterprise/entities/answer-comment';
import { IAnswerCommentsRepository } from '../repositories/IAnswerComments-repository';
import { PaginationParams } from '@/core/repositories/pagination-params';

interface IFetchCommentsAnswerAnswerUseCaseRequest {
  page: number;
  answerId: string;
}

type IGetCommentsAnswerUseCaseResponse = Either<
  null,
  {
    answer: AnswerComments[];
  }
>;
class FestCommentsAnswerUseCase {
  constructor(private commentsAnswerRepository: IAnswerCommentsRepository) {}

  async execute({
    page,
    answerId,
  }: IFetchCommentsAnswerAnswerUseCaseRequest): Promise<IGetCommentsAnswerUseCaseResponse> {
    const answer = await this.commentsAnswerRepository.fetchCommentsFromAnswer(
      answerId,
      { page }
    );

    return right({
      answer,
    });
  }
}

export { FestCommentsAnswerUseCase };
