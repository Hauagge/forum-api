import { DeleteCommentOnAnswerUseCase } from './delete-comment-answer';
import { AnswerRepositoryInMemory } from 'test/repositories/in-memory-answer-repository';
import { AnswerCommentRepositoryInMemory } from 'test/repositories/in-memory-answer-comment-repository';
import { makeAnswerComment } from 'test/factories/make-answer-comment';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from './errors/NotAllowedError';

let answerRepositoryInMemory: AnswerRepositoryInMemory;
let answerCommentRepositoryInMemory: AnswerCommentRepositoryInMemory;
let sut: DeleteCommentOnAnswerUseCase;

describe('Delete a comment from  answer ', () => {
  beforeEach(() => {
    answerRepositoryInMemory = new AnswerRepositoryInMemory();
    answerCommentRepositoryInMemory = new AnswerCommentRepositoryInMemory();
    sut = new DeleteCommentOnAnswerUseCase(answerCommentRepositoryInMemory);
  });
  test('should delete a comment from  answer', async () => {
    const commentFromAnswer = makeAnswerComment();

    await answerCommentRepositoryInMemory.create(commentFromAnswer);
    await sut.execute({
      authorId: '2',
      commentId: commentFromAnswer.id.toString(),
    });

    expect(answerRepositoryInMemory.answers).toHaveLength(0);
  });

  test('should delete a comment from another answer', async () => {
    const commentFromAnswer = makeAnswerComment({
      authorId: new UniqueEntityId('1'),
    });

    await answerCommentRepositoryInMemory.create(commentFromAnswer);

    const result = await sut.execute({
      authorId: '2',
      commentId: commentFromAnswer.id.toString(),
    });

    expect(result.isLeft).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
