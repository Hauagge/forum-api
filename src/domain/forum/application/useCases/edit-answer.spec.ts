import { EditAnswerUseCase } from './edit-answer';
import { AnswerRepositoryInMemory } from 'test/repositories/in-memory-answer-repository';
import { makeAnswer } from 'test/factories/make-answer';
import { NotAllowedError } from './errors/NotAllowedError';

let answerRepositoryInMemory: AnswerRepositoryInMemory;
let sut: EditAnswerUseCase;

describe('Edit a answer ', () => {
  beforeEach(() => {
    answerRepositoryInMemory = new AnswerRepositoryInMemory();
    sut = new EditAnswerUseCase(answerRepositoryInMemory);
  });
  test('should to edit answer ', async () => {
    const newAnswer = makeAnswer();
    await answerRepositoryInMemory.create(newAnswer);
    await sut.execute({
      authorId: newAnswer.authorId.toString(),
      answerId: newAnswer.id.toString(),
      content: 'new content',
    });
    expect(answerRepositoryInMemory.answers[0]).toMatchObject({
      content: 'new content',
    });
  });

  test('should  not edit answer from another user', async () => {
    const newAnswer = makeAnswer();

    await answerRepositoryInMemory.create(newAnswer);
    const result = await sut.execute({
      authorId: 'another-id-user',
      answerId: newAnswer.id.toString(),
      content: 'new content',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
