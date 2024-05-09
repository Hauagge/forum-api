import { Either, right } from '@/core/either';
import { Question } from '../../enterprise/entities/question';
import { IQuestionRepository } from '../repositories/IQuestions-repository';
import { PaginationParams } from '@/core/repositories/pagination-params';

type IGetQuestionUseCaseResponse = Either<
  null,
  {
    questions: Question[];
  }
>;
class FestRecentQuestionsUseCase {
  constructor(private questionRepository: IQuestionRepository) {}

  async execute({
    page,
  }: PaginationParams): Promise<IGetQuestionUseCaseResponse> {
    const questions = await this.questionRepository.listManyRecent({ page });

    return right({
      questions,
    });
  }
}

export { FestRecentQuestionsUseCase };
