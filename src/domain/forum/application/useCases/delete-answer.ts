import { Either, left, right } from '@/core/either';
import { IAnswerRepository } from '../repositories/IAnswer-repository';
import { ResourceNotFoundError } from './errors/ResourceNotFoundError';
import { NotAllowedError } from './errors/NotAllowedError';

interface IDeleteAnswerUseCase {
  authorId: string;
  answerId: string;
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;
class DeleteAnswerUseCase {
  constructor(private answerRepository: IAnswerRepository) {}

  async execute({
    answerId,
    authorId,
  }: IDeleteAnswerUseCase): Promise<DeleteAnswerUseCaseResponse> {
    const AnswerExists = await this.answerRepository.findById(answerId);
    if (!AnswerExists) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== AnswerExists.authorId.toString()) {
      return left(new NotAllowedError());
    }
    await this.answerRepository.delete(answerId);
    return right({});
  }
}

export { DeleteAnswerUseCase };
