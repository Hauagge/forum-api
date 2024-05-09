import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

type AnswerAttachmentProps = {
  answerId: UniqueEntityId;
  attachmentId: UniqueEntityId;
};

class AnswerAttachments extends Entity<AnswerAttachmentProps> {
  get answerId() {
    return this.props.answerId;
  }

  get attachmentId() {
    return this.props.attachmentId;
  }

  static create(attachmentProps: AnswerAttachmentProps, id?: UniqueEntityId) {
    const attachment = new AnswerAttachments(attachmentProps, id);

    return attachment;
  }
}

export { AnswerAttachments };
