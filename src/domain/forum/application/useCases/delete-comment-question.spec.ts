import { DeleteCommentOnQuestionUseCase } from './delete-comment-question';
import { QuestionCommentCommentRepositoryInMemory } from 'test/repositories/in-memory-questions-comments-repository';
import { makeQuestionComment } from 'test/factories/make-question-comment';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from './errors/NotAllowedError';

let questionCommentRepositoryInMemory: QuestionCommentCommentRepositoryInMemory;
let sut: DeleteCommentOnQuestionUseCase;

describe('Delete a comment from  question ', () => {
  beforeEach(() => {
    questionCommentRepositoryInMemory =
      new QuestionCommentCommentRepositoryInMemory();
    sut = new DeleteCommentOnQuestionUseCase(questionCommentRepositoryInMemory);
  });
  test('should delete a comment from  question', async () => {
    const commentFromQuestion = makeQuestionComment();

    await questionCommentRepositoryInMemory.create(commentFromQuestion);
    await sut.execute({
      authorId: commentFromQuestion.authorId.toString(),
      commentId: commentFromQuestion.id.toString(),
    });

    expect(questionCommentRepositoryInMemory.questionComments).toHaveLength(0);
  });

  test('should not be able to delete a comment from another user', async () => {
    const commentFromQuestion = makeQuestionComment({
      authorId: new UniqueEntityId('autor-1'),
    });

    await questionCommentRepositoryInMemory.create(commentFromQuestion);

    const result = await sut.execute({
      authorId: 'autor-2',
      commentId: commentFromQuestion.id.toString(),
    });
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
