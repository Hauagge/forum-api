import { Question } from '../../enterprise/entities/question';
import { IQuestionRepository } from '../repositories/IQuestions-repository';
import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from './errors/ResourceNotFoundError';

interface IGetQuestionUseCase {
  slug: string;
}

type GetQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: Question;
  }
>;
class GetQuestionBySloganUseCase {
  constructor(private questionRepository: IQuestionRepository) {}

  async execute({
    slug,
  }: IGetQuestionUseCase): Promise<GetQuestionUseCaseResponse> {
    const question = await this.questionRepository.getBySlug(slug);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    return right({
      question,
    });
  }
}

export { GetQuestionBySloganUseCase };
