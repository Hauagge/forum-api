import { Either, left, right } from '@/core/either';
import { IQuestionRepository } from '../repositories/IQuestions-repository';
import { ResourceNotFoundError } from './errors/ResourceNotFoundError';
import { NotAllowedError } from './errors/NotAllowedError';

interface IDeleteQuestionUseCase {
  authorId: string;
  questionId: string;
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

class DeleteQuestionUseCase {
  constructor(private questionRepository: IQuestionRepository) {}

  async execute({
    questionId,
    authorId,
  }: IDeleteQuestionUseCase): Promise<DeleteQuestionUseCaseResponse> {
    const questionExists = await this.questionRepository.findById(questionId);
    if (!questionExists) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== questionExists.authorId.toString()) {
      return left(new NotAllowedError());
    }
    await this.questionRepository.delete(questionId);

    return right({});
  }
}

export { DeleteQuestionUseCase };
