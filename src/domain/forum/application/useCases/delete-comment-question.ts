import { Either, left, right } from '@/core/either';
import { IQuestionCommentsRepository } from '../repositories/IQuestionComments-repository';
import { NotAllowedError } from './errors/NotAllowedError';
import { ResourceNotFoundError } from './errors/ResourceNotFoundError';

interface ICommentOnQuestionUseCase {
  authorId: string;
  commentId: string;
}

type DeleteCommentQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

class DeleteCommentOnQuestionUseCase {
  constructor(private questionCommentRepository: IQuestionCommentsRepository) {}

  async execute({
    authorId,
    commentId,
  }: ICommentOnQuestionUseCase): Promise<DeleteCommentQuestionUseCaseResponse> {
    const comment = await this.questionCommentRepository.findById(commentId);
    if (!comment) {
      return left(new ResourceNotFoundError());
    }

    if (comment.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.questionCommentRepository.delete(comment);

    return right({});
  }
}

export { DeleteCommentOnQuestionUseCase };
