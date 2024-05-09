import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { Comments, CommentsProps } from './comments';

export interface AnswerCommentsProps extends CommentsProps {
  authorId: UniqueEntityId;
  answerId: UniqueEntityId;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

class AnswerComments extends Comments<AnswerCommentsProps> {
  get answerId() {
    return this.props.answerId;
  }

  static create(
    props: Optional<AnswerCommentsProps, 'createdAt'>,
    id?: UniqueEntityId
  ) {
    const answerComments = new AnswerComments(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );

    return answerComments;
  }
}

export { AnswerComments };
