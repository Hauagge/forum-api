import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { IQuestionRepository } from '../repositories/IQuestions-repository';
import { QuestionComments } from '../../enterprise/entities/question-comment';
import { IQuestionCommentsRepository } from '../repositories/IQuestionComments-repository';
import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from './errors/ResourceNotFoundError';

interface ICommentOnQuestionUseCase {
  authorId: string;
  questionId: string;
  content: string;
}

type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComments;
  }
>;
class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: IQuestionRepository,
    private questionComment: IQuestionCommentsRepository
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: ICommentOnQuestionUseCase): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);
    if (!question) {
      return left(new ResourceNotFoundError());
    }

    const questionComment = QuestionComments.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    });

    await this.questionComment.create(questionComment);
    return right({ questionComment });
  }
}

export { CommentOnQuestionUseCase };
