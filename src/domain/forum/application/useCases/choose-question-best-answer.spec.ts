import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer';
import { QuestionRepositoryInMemory } from 'test/repositories/in-memory-questions-repository';
import { AnswerRepositoryInMemory } from 'test/repositories/in-memory-answer-repository';

import { makeQuestion } from 'test/factories/make-question';
import { makeAnswer } from 'test/factories/make-answer';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

let questionRepositoryInMemory: QuestionRepositoryInMemory;
let answerRepositoryInMemory: AnswerRepositoryInMemory;

let sut: ChooseQuestionBestAnswerUseCase;

describe('Choose best question answer  ', () => {
  beforeEach(() => {
    questionRepositoryInMemory = new QuestionRepositoryInMemory();
    answerRepositoryInMemory = new AnswerRepositoryInMemory();

    sut = new ChooseQuestionBestAnswerUseCase(
      questionRepositoryInMemory,
      answerRepositoryInMemory
    );
  });
  test('should to edit question ', async () => {
    const newQuestion = makeQuestion();
    const newAnswer = makeAnswer({
      questionId: newQuestion.id,
    });
    await questionRepositoryInMemory.create(newQuestion);
    await answerRepositoryInMemory.create(newAnswer);

    await sut.execute({
      authorId: newQuestion.authorId.toString(),
      questionId: newQuestion.id.toString(),
      answerId: newAnswer.id.toString(),
    });
    expect(questionRepositoryInMemory.questions[0].bestAnswerId).toEqual(
      newAnswer.id
    );
  });

  test('should  not edit question from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('another-id-user'),
    });
    const newAnswer = makeAnswer({
      questionId: newQuestion.id,
    });
    await questionRepositoryInMemory.create(newQuestion);

    await expect(
      sut.execute({
        authorId: 'another-id-user',
        questionId: newQuestion.id.toString(),
        answerId: newAnswer.id.toString(),
      })
    ).rejects.toThrow();
  });
});
