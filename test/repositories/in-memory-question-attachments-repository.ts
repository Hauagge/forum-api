import { IQuestionAttachmentRepository } from '@/domain/forum/application/repositories/IQuestionAttachment-repository';
import { QuestionAttachments } from '@/domain/forum/enterprise/entities/question-attachment';

class QuestionAttachmentsRepositoryInMemory
  implements IQuestionAttachmentRepository
{
  public questionAttachment: QuestionAttachments[] = [];

  async fetchAttachmentsFromQuestion(
    questionId: string
  ): Promise<QuestionAttachments[]> {
    return this.questionAttachment.filter(
      (questionComment) => questionComment.questionId.toString() === questionId
    );
  }

  async deleteAttachmentsFromQuestion(questionId: string): Promise<void> {
    const attachments = this.questionAttachment.filter(
      (questionAttachment) =>
        questionAttachment.questionId.toString() !== questionId
    );

    this.questionAttachment = attachments;
  }
}
export { QuestionAttachmentsRepositoryInMemory };
