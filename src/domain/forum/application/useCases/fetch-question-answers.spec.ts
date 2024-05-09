import { FestRecentAnswerUseCase } from './fetch-questions-answer';
import { AnswerRepositoryInMemory } from 'test/repositories/in-memory-answer-repository';
import { makeQuestion } from 'test/factories/make-question';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { makeAnswer } from 'test/factories/make-answer';

let questionRepositoryInMemory: AnswerRepositoryInMemory;
let sut: FestRecentAnswerUseCase;

describe('Fetch Question Answers  ', () => {
  beforeEach(() => {
    questionRepositoryInMemory = new AnswerRepositoryInMemory();
    sut = new FestRecentAnswerUseCase(questionRepositoryInMemory);
  });
  test('should fetch recent  answer ', async () => {
    await questionRepositoryInMemory.create(
      makeAnswer({ questionId: new UniqueEntityId('question-1') })
    );
    await questionRepositoryInMemory.create(
      makeAnswer({ questionId: new UniqueEntityId('question-1') })
    );
    await questionRepositoryInMemory.create(
      makeAnswer({ questionId: new UniqueEntityId('question-2') })
    );

    const result = await sut.execute({ questionId: 'question-1', page: 1 });

    expect(result.value?.answer).toHaveLength(2);
  });
  test('should be able to fetch paginated questions answer ', async () => {
    for (let i = 1; i <= 22; i++) {
      await questionRepositoryInMemory.create(
        makeAnswer({ questionId: new UniqueEntityId('question-1') })
      );
    }

    const result = await sut.execute({ questionId: 'question-1', page: 2 });

    expect(result.value?.answer).toHaveLength(2);
  });
});
