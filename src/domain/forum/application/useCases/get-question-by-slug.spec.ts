import { GetQuestionBySloganUseCase } from './get-question-by-slug';
import { QuestionRepositoryInMemory } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';

let questionRepositoryInMemory: QuestionRepositoryInMemory;
let sut: GetQuestionBySloganUseCase;

describe('Get a question By Slug ', () => {
  beforeEach(() => {
    questionRepositoryInMemory = new QuestionRepositoryInMemory();
    sut = new GetQuestionBySloganUseCase(questionRepositoryInMemory);
  });
  test('should get question by slug ', async () => {
    const newQuestion = makeQuestion();
    await questionRepositoryInMemory.create(newQuestion);
    const result = await sut.execute({
      slug: 'example-question',
    });
    expect(result.isRight()).toBeTruthy();
    expect(result.value?.question.content).toEqual(newQuestion.content);
    expect(questionRepositoryInMemory.questions[0].id).toEqual(
      result.value?.question.id
    );
  });
});
