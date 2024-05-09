import { DeleteAnswerUseCase } from './delete-answer';
import { AnswerRepositoryInMemory } from 'test/repositories/in-memory-answer-repository';
import { makeAnswer } from 'test/factories/make-answer';
import { NotAllowedError } from './errors/NotAllowedError';

let answerRepositoryInMemory: AnswerRepositoryInMemory;
let sut: DeleteAnswerUseCase;

describe('Delete a answer ', () => {
  beforeEach(() => {
    answerRepositoryInMemory = new AnswerRepositoryInMemory();
    sut = new DeleteAnswerUseCase(answerRepositoryInMemory);
  });
  test('should to delete answer ', async () => {
    const newAnswer = makeAnswer();
    await answerRepositoryInMemory.create(newAnswer);
    await sut.execute({
      authorId: newAnswer.authorId.toString(),
      answerId: newAnswer.id.toString(),
    });
    expect(answerRepositoryInMemory.answers.length).toEqual(0);
  });

  test('should  not delete answer from another user', async () => {
    const newAnswer = makeAnswer();
    await answerRepositoryInMemory.create(newAnswer);
    const result = await sut.execute({
      authorId: 'another-id-user',
      answerId: newAnswer.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
    expect(answerRepositoryInMemory.answers.length).toEqual(1);
  });
});
