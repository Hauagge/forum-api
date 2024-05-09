import { FestCommentsAnswerUseCase } from './fetch-comments-answer';
import { AnswerCommentRepositoryInMemory } from 'test/repositories/in-memory-answer-comment-repository';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { makeAnswerComment } from 'test/factories/make-answer-comment';

let commentsAnswerRepositoryInMemory: AnswerCommentRepositoryInMemory;
let sut: FestCommentsAnswerUseCase;

describe('Fetch Comments Answer Answers  ', () => {
  beforeEach(() => {
    commentsAnswerRepositoryInMemory = new AnswerCommentRepositoryInMemory();
    sut = new FestCommentsAnswerUseCase(commentsAnswerRepositoryInMemory);
  });
  test('should fetch recent  answer ', async () => {
    await commentsAnswerRepositoryInMemory.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') })
    );
    await commentsAnswerRepositoryInMemory.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') })
    );
    await commentsAnswerRepositoryInMemory.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-2') })
    );

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    });

    expect(result.value?.answer).toHaveLength(2);
  });
  test('should be able to fetch paginated Comments Answers answer ', async () => {
    for (let i = 1; i <= 22; i++) {
      await commentsAnswerRepositoryInMemory.create(
        makeAnswerComment({ answerId: new UniqueEntityId('Comments Answer-1') })
      );
    }

    const result = await sut.execute({
      answerId: 'Comments Answer-1',
      page: 2,
    });

    expect(result.value?.answer).toHaveLength(2);
  });
});
