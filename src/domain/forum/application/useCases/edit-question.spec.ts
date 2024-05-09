import { EditQuestionUseCase } from './edit-question';
import { QuestionRepositoryInMemory } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';
import { NotAllowedError } from './errors/NotAllowedError';
import { QuestionAttachmentsRepositoryInMemory } from 'test/repositories/in-memory-question-attachments-repository';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { makeQuestionAttachment } from 'test/factories/make-question-attachment';

let questionRepositoryInMemory: QuestionRepositoryInMemory;
let questionAttachmentsRepositoryInMemory: QuestionAttachmentsRepositoryInMemory;
let sut: EditQuestionUseCase;

describe('Edit a question ', () => {
  beforeEach(() => {
    questionRepositoryInMemory = new QuestionRepositoryInMemory();
    questionAttachmentsRepositoryInMemory =
      new QuestionAttachmentsRepositoryInMemory();
    sut = new EditQuestionUseCase(
      questionRepositoryInMemory,
      questionAttachmentsRepositoryInMemory
    );
  });
  test('should to edit question ', async () => {
    const newQuestion = makeQuestion();

    await questionRepositoryInMemory.create(newQuestion);

    questionAttachmentsRepositoryInMemory.questionAttachment.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityId('2'),
      })
    );

    await sut.execute({
      authorId: newQuestion.authorId.toString(),
      questionId: newQuestion.id.toString(),
      content: 'new content',
      title: 'new title',
      attachmentsIds: ['1', '3'],
    });

    expect(
      questionRepositoryInMemory.questions[0].attachments.currentItems
    ).toHaveLength(2);
    expect(
      questionRepositoryInMemory.questions[0].attachments.currentItems
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('3') }),
    ]);
    expect(questionRepositoryInMemory.questions[0]).toMatchObject({
      content: 'new content',
      title: 'new title',
    });
  });

  test('should  not edit question from another user', async () => {
    const newQuestion = makeQuestion();

    await questionRepositoryInMemory.create(newQuestion);
    const result = await sut.execute({
      authorId: 'another-id-user',
      questionId: newQuestion.id.toString(),
      content: 'new content',
      title: 'new title',
      attachmentsIds: [],
    });
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
