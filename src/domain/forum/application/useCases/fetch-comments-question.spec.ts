import { FetchCommentsQuestionUseCase } from './fetch-comments-question';
import { QuestionCommentCommentRepositoryInMemory } from 'test/repositories/in-memory-questions-comments-repository';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { makeQuestionComment } from 'test/factories/make-question-comment';

let commentsQuestionRepositoryInMemory: QuestionCommentCommentRepositoryInMemory;
let sut: FetchCommentsQuestionUseCase;

describe('Fetch Comments Question Questions  ', () => {
  beforeEach(() => {
    commentsQuestionRepositoryInMemory =
      new QuestionCommentCommentRepositoryInMemory();
    sut = new FetchCommentsQuestionUseCase(commentsQuestionRepositoryInMemory);
  });
  test('should fetch recent  question ', async () => {
    await commentsQuestionRepositoryInMemory.create(
      makeQuestionComment({ questionId: new UniqueEntityId('question-1') })
    );
    await commentsQuestionRepositoryInMemory.create(
      makeQuestionComment({ questionId: new UniqueEntityId('question-1') })
    );
    await commentsQuestionRepositoryInMemory.create(
      makeQuestionComment({ questionId: new UniqueEntityId('question-2') })
    );

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    });

    expect(result.value?.question).toHaveLength(2);
  });
  test('should be able to fetch paginated Comments Questions question ', async () => {
    for (let i = 1; i <= 22; i++) {
      await commentsQuestionRepositoryInMemory.create(
        makeQuestionComment({
          questionId: new UniqueEntityId('Comments Question-1'),
        })
      );
    }

    const result = await sut.execute({
      questionId: 'Comments Question-1',
      page: 2,
    });

    expect(result.value?.question).toHaveLength(2);
  });
});
