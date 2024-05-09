import { QuestionAttachments } from '../../enterprise/entities/question-attachment';

interface IQuestionAttachmentRepository {
  fetchAttachmentsFromQuestion(
    questionId: string
  ): Promise<QuestionAttachments[]>;

  deleteAttachmentsFromQuestion(questionId: string): Promise<void>;
}

export { IQuestionAttachmentRepository };
