import { FestRecentQuestionsUseCase } from './fetch-recent-questions';
import { QuestionRepositoryInMemory } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';

let questionRepositoryInMemory: QuestionRepositoryInMemory;
let sut: FestRecentQuestionsUseCase;

describe('Fetch Recent Questions  ', () => {
  beforeEach(() => {
    questionRepositoryInMemory = new QuestionRepositoryInMemory();
    sut = new FestRecentQuestionsUseCase(questionRepositoryInMemory);
  });
  test('should fetch recent  questions ', async () => {
    await questionRepositoryInMemory.create(
      makeQuestion({ createdAt: new Date('2021-01-01') })
    );
    await questionRepositoryInMemory.create(
      makeQuestion({ createdAt: new Date('2021-01-02') })
    );
    await questionRepositoryInMemory.create(
      makeQuestion({ createdAt: new Date('2021-01-03') })
    );

    const result = await sut.execute({ page: 1 });

    expect(result.isRight()).toBeTruthy();
    expect(questionRepositoryInMemory.questions[0].id).toEqual(
      result.value?.questions[0].id
    );
    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date('2021-01-03') }),
      expect.objectContaining({ createdAt: new Date('2021-01-02') }),
      expect.objectContaining({ createdAt: new Date('2021-01-01') }),
    ]);
  });

  test('should paginate questions ', async () => {
    for (let i = 1; i <= 22; i++) {
      await questionRepositoryInMemory.create(makeQuestion());
    }

    const result = await sut.execute({ page: 2 });

    expect(result.value?.questions).toHaveLength(2);
  });
});
