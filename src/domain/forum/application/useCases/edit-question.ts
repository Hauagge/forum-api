import { Either, left, right } from '@/core/either';
import { Question } from '../../enterprise/entities/question';
import { IQuestionRepository } from '../repositories/IQuestions-repository';
import { NotAllowedError } from './errors/NotAllowedError';
import { ResourceNotFoundError } from './errors/ResourceNotFoundError';
import { IQuestionAttachmentRepository } from '../repositories/IQuestionAttachment-repository';
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list';
import { QuestionAttachments } from '../../enterprise/entities/question-attachment';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

interface IEditQuestionUseCase {
  authorId: string;
  title: string;
  content: string;
  questionId: string;
  attachmentsIds: string[];
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question;
  }
>;

class EditQuestionUseCase {
  constructor(
    private questionRepository: IQuestionRepository,
    private questionAttachmentRepository: IQuestionAttachmentRepository
  ) {}

  async execute({
    questionId,
    authorId,
    content,
    title,
    attachmentsIds,
  }: IEditQuestionUseCase): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);
    if (!question) {
      return left(new ResourceNotFoundError());
    }
    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError());
    }

    const currentQuestionAttachment =
      await this.questionAttachmentRepository.fetchAttachmentsFromQuestion(
        questionId
      );

    const questionAttachmentList = new QuestionAttachmentList(
      currentQuestionAttachment
    );

    const questionAttachment = attachmentsIds.map((attachmentId) => {
      return QuestionAttachments.create({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: question.id,
      });
    });

    questionAttachmentList.update(questionAttachment);

    question.content = content;
    question.title = title;
    question.attachments = questionAttachmentList;
    await this.questionRepository.update(question);

    return right({
      question,
    });
  }
}

export { EditQuestionUseCase };
