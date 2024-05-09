import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { IAnswerRepository } from '../repositories/IAnswer-repository';
import { AnswerComments } from '../../enterprise/entities/answer-comment';
import { IAnswerCommentsRepository } from '../repositories/IAnswerComments-repository';
import { ResourceNotFoundError } from './errors/ResourceNotFoundError';
import { Either, left, right } from '@/core/either';

interface ICommentOnAnswerUseCase {
  authorId: string;
  answerId: string;
  content: string;
}

type CreateCommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComments;
  }
>;
class CreateCommentOnAnswerUseCase {
  constructor(
    private answerRepository: IAnswerRepository,
    private answerComment: IAnswerCommentsRepository
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: ICommentOnAnswerUseCase): Promise<CreateCommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);
    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    const answerComment = AnswerComments.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    });

    await this.answerComment.create(answerComment);
    return right({ answerComment });
  }
}

export { CreateCommentOnAnswerUseCase };
