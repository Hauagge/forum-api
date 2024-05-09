import { CreateQuestionUseCase } from './create-question';
import { QuestionRepositoryInMemory } from 'test/repositories/in-memory-questions-repository';

let questionRepositoryInMemory: QuestionRepositoryInMemory;
let sut: CreateQuestionUseCase;

describe('Create a question ', () => {
  beforeEach(() => {
    questionRepositoryInMemory = new QuestionRepositoryInMemory();
    sut = new CreateQuestionUseCase(questionRepositoryInMemory);
  });
  test('should create a new question', async () => {
    const result = await sut.execute({
      authorId: '1',
      content: 'Nova pergunta',
      title: 'Nova pergunta',
      attachmentsIds: ['1', '2', '3'],
    });
    expect(result.value?.question.content).toEqual('Nova pergunta');
    expect(questionRepositoryInMemory.questions[0].id).toEqual(
      result.value?.question.id
    );
    expect(
      questionRepositoryInMemory.questions[0].attachments.currentItems
    ).toHaveLength(3);
  });
});
