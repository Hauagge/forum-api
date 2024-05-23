import { AnswerAttachments } from '../../enterprise/entities/answer-attachment';

interface IAnswerAttachmentRepository {
  fetchAttachmentsFromAnswer(answerId: string): Promise<AnswerAttachments[]>;

  deleteAttachmentsFromAnswer(answerId: string): Promise<void>;
}

export { IAnswerAttachmentRepository };
