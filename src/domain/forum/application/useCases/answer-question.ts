import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { IAnswerRepository } from '../repositories/IAnswer-repository';
import { Either, right } from '@/core/either';
import { AnswerAttachments } from '../../enterprise/entities/answer-attachment';
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachments-list';

interface IAnswerQuestion {
  instructorId: string;
  questionId: string;
  content: string;
  attachmentsIds: string[];
}

type IAnswerResponse = Either<
  null,
  {
    answer: Answer;
  }
>;

class AnswerQuestionUseCase {
  constructor(private answerRepository: IAnswerRepository) {}
  async execute({
    instructorId,
    questionId,
    content,
    attachmentsIds,
  }: IAnswerQuestion): Promise<IAnswerResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    });

    const answerAttachments = attachmentsIds.map((attachmentsId) => {
      return AnswerAttachments.create({
        answerId: answer.id,
        attachmentId: new UniqueEntityId(attachmentsId),
      });
    });

    answer.attachments = new AnswerAttachmentList(answerAttachments);
    await this.answerRepository.create(answer);
    return right({
      answer,
    });
  }
}

export { AnswerQuestionUseCase };
