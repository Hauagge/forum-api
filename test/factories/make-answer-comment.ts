import { faker } from '@faker-js/faker';

import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import {
  AnswerComments,
  AnswerCommentsProps,
} from '@/domain/forum/enterprise/entities/answer-comment';

export function makeAnswerComment(
  override: Partial<AnswerCommentsProps> = {},
  id?: UniqueEntityId
): AnswerComments {
  const answerComment = AnswerComments.create(
    {
      authorId: new UniqueEntityId(),
      answerId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id
  );

  return answerComment;
}
