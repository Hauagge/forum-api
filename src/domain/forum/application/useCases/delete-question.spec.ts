import { DeleteQuestionUseCase } from './delete-question';
import { QuestionRepositoryInMemory } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';
import { NotAllowedError } from './errors/NotAllowedError';
import { QuestionAttachmentsRepositoryInMemory } from 'test/repositories/in-memory-question-attachments-repository';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { makeQuestionAttachment } from 'test/factories/make-question-attachment';

let questionRepositoryInMemory: QuestionRepositoryInMemory;
let questionAttachmentRepositoryInMemory: QuestionAttachmentsRepositoryInMemory;
let sut: DeleteQuestionUseCase;

describe('Delete a question ', () => {
  beforeEach(() => {
    questionAttachmentRepositoryInMemory =
      new QuestionAttachmentsRepositoryInMemory();

    questionRepositoryInMemory = new QuestionRepositoryInMemory(
      questionAttachmentRepositoryInMemory
    );

    sut = new DeleteQuestionUseCase(questionRepositoryInMemory);
  });
  test('should to delete question ', async () => {
    const newQuestion = makeQuestion();
    await questionRepositoryInMemory.create(newQuestion);

    questionAttachmentRepositoryInMemory.questionAttachment.push(
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
    });
    expect(questionRepositoryInMemory.questions.length).toEqual(0);
    expect(
      questionAttachmentRepositoryInMemory.questionAttachment.length
    ).toEqual(0);
  });

  test('should  not delete question from another user', async () => {
    const newQuestion = makeQuestion();
    await questionRepositoryInMemory.create(newQuestion);
    const result = await sut.execute({
      authorId: 'another-id-user',
      questionId: newQuestion.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
    expect(questionRepositoryInMemory.questions.length).toEqual(1);
  });
});
