import { faker } from '@faker-js/faker';

import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import {
  QuestionComments,
  QuestionCommentsProps,
} from '@/domain/forum/enterprise/entities/question-comment';

export function makeQuestionComment(
  override: Partial<QuestionCommentsProps> = {},
  id?: UniqueEntityId
): QuestionComments {
  const questionComment = QuestionComments.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id
  );

  return questionComment;
}
