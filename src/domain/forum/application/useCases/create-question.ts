import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Question } from '../../enterprise/entities/question';
import { IQuestionRepository } from '../repositories/IQuestions-repository';
import { Either, right } from '@/core/either';
import { QuestionAttachments } from '../../enterprise/entities/question-attachment';
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list';

interface ICreateQuestionUseCase {
  authorId: string;
  title: string;
  content: string;
  attachmentsIds: string[];
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question;
  }
>;
class CreateQuestionUseCase {
  constructor(private questionRepository: IQuestionRepository) {}

  async execute({
    authorId,
    title,
    content,
    attachmentsIds,
  }: ICreateQuestionUseCase): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    });

    const questionAttachments = attachmentsIds.map((attachmentsId) => {
      return QuestionAttachments.create({
        questionId: question.id,
        attachmentId: new UniqueEntityId(attachmentsId),
      });
    });

    question.attachments = new QuestionAttachmentList(questionAttachments);

    await this.questionRepository.create(question);
    return right({
      question,
    });
  }
}

export { CreateQuestionUseCase };
