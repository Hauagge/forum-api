import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

type AttachmentProps = {
  title: string;
  link: string;
};

class Attachments extends Entity<AttachmentProps> {
  get title() {
    return this.props.title;
  }

  get link() {
    return this.props.link;
  }

  static create(attachmentProps: AttachmentProps, id: UniqueEntityId) {
    const attachment = new Attachments(attachmentProps, id);

    return attachment;
  }
}

export { Attachments };
