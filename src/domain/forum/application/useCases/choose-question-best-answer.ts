import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Question } from '../../enterprise/entities/question';
import { IQuestionRepository } from '../repositories/IQuestions-repository';
import { IAnswerRepository } from '../repositories/IAnswer-repository';
import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from './errors/ResourceNotFoundError';
import { NotAllowedError } from './errors/NotAllowedError';

interface IChooseQuestionBestAnswerUseCase {
  questionId: string;
  authorId: string;
  answerId: string;
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: Question;
  }
>;
class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionRepository: IQuestionRepository,
    private answerRepository: IAnswerRepository
  ) {}

  async execute({
    answerId,
    questionId,
    authorId,
  }: IChooseQuestionBestAnswerUseCase): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }
    const answer = await this.answerRepository.findById(answerId);
    if (!answer) {
      throw new Error('Answer not found');
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError());
    }

    question.bestAnswerId = answer.id;

    await this.questionRepository.update(question);

    return right({ question });
  }
}

export { ChooseQuestionBestAnswerUseCase };
