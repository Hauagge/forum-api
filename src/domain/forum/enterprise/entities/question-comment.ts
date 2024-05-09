import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { Comments, CommentsProps } from './comments';

export interface QuestionCommentsProps extends CommentsProps {
  authorId: UniqueEntityId;
  questionId: UniqueEntityId;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

class QuestionComments extends Comments<QuestionCommentsProps> {
  get questionId() {
    return this.props.questionId;
  }

  static create(
    props: Optional<QuestionCommentsProps, 'createdAt'>,
    id?: UniqueEntityId
  ) {
    const questionComments = new QuestionComments(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );

    return questionComments;
  }
}

export { QuestionComments };
