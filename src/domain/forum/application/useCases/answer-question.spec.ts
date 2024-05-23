import { AnswerQuestionUseCase } from './answer-question';
import { AnswerRepositoryInMemory } from 'test/repositories/in-memory-answer-repository';

let answerRepositoryInMemory: AnswerRepositoryInMemory;
let sut: AnswerQuestionUseCase;

describe('Create answer', () => {
  beforeEach(() => {
    answerRepositoryInMemory = new AnswerRepositoryInMemory();
    sut = new AnswerQuestionUseCase(answerRepositoryInMemory);
  });
  test('should create a new answer', async () => {
    const result = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Nova resposta',
      attachmentsIds: [],
    });
    expect(result.value?.answer.content).toEqual('Nova resposta');
    expect(answerRepositoryInMemory.answers[0].id).toEqual(
      result.value?.answer.id
    );
  });
});
