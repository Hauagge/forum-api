import { Either, left, right } from '@/core/either';
import { Answer } from '../../enterprise/entities/answer';
import { IAnswerRepository } from '../repositories/IAnswer-repository';
import { ResourceNotFoundError } from './errors/ResourceNotFoundError';
import { NotAllowedError } from './errors/NotAllowedError';

interface IEditAnswerUseCase {
  authorId: string;
  content: string;
  answerId: string;
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer;
  }
>;

class EditAnswerUseCase {
  constructor(private answerRepository: IAnswerRepository) {}

  async execute({
    answerId,
    authorId,
    content,
  }: IEditAnswerUseCase): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);
    if (!answer) {
      return left(new ResourceNotFoundError());
    }
    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError());
    }

    answer.content = content;
    await this.answerRepository.update(answer);

    return right({
      answer,
    });
  }
}

export { EditAnswerUseCase };
