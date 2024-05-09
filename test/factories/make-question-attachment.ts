import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import {
  QuestionAttachments,
  QuestionAttachmentsProps,
} from '@/domain/forum/enterprise/entities/question-attachment';

export function makeQuestionAttachment(
  override: Partial<QuestionAttachmentsProps> = {},
  id?: UniqueEntityId
): QuestionAttachments {
  const questionAttachment = QuestionAttachments.create(
    {
      questionId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...override,
    },
    id
  );

  return questionAttachment;
}
