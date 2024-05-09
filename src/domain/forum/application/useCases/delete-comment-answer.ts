import { Either, left, right } from '@/core/either';
import { IAnswerCommentsRepository } from '../repositories/IAnswerComments-repository';
import { ResourceNotFoundError } from './errors/ResourceNotFoundError';
import { NotAllowedError } from './errors/NotAllowedError';

interface ICommentOnAnswerUseCase {
  authorId: string;
  commentId: string;
}

type IAnswerCommentsResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;
class DeleteCommentOnAnswerUseCase {
  constructor(private answerCommentRepository: IAnswerCommentsRepository) {}

  async execute({
    authorId,
    commentId,
  }: ICommentOnAnswerUseCase): Promise<IAnswerCommentsResponse> {
    const comment = await this.answerCommentRepository.findById(commentId);
    if (!comment) {
      return left(new ResourceNotFoundError());
    }

    if (comment.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.answerCommentRepository.delete(comment);

    return right({});
  }
}

export { DeleteCommentOnAnswerUseCase };
