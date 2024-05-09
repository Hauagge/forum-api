import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export type QuestionAttachmentsProps = {
  questionId: UniqueEntityId;
  attachmentId: UniqueEntityId;
};

class QuestionAttachments extends Entity<QuestionAttachmentsProps> {
  get questionId() {
    return this.props.questionId;
  }

  get attachmentId() {
    return this.props.attachmentId;
  }

  static create(
    attachmentProps: QuestionAttachmentsProps,
    id?: UniqueEntityId
  ) {
    const attachment = new QuestionAttachments(attachmentProps, id);

    return attachment;
  }
}

export { QuestionAttachments };
