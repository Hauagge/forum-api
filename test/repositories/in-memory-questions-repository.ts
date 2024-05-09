import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { IQuestionAttachmentRepository } from '@/domain/forum/application/repositories/IQuestionAttachment-repository';
import { IQuestionRepository } from '@/domain/forum/application/repositories/IQuestions-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';

class QuestionRepositoryInMemory implements IQuestionRepository {
  public questions: Question[] = [];

  constructor(
    private questionAttachmentRepository: IQuestionAttachmentRepository
  ) {}
  async create(question: Question): Promise<void> {
    this.questions.push(question);
  }

  async getBySlug(slug: string): Promise<Question | undefined> {
    return this.questions.find((q) => q.slug?.value === slug);
  }

  async findById(id: string): Promise<Question | undefined> {
    return this.questions.find((q) => q.id.toString() === id);
  }

  async delete(id: string): Promise<void> {
    this.questions = this.questions.filter((q) => q.id.toString() !== id);
    this.questionAttachmentRepository.deleteAttachmentsFromQuestion(id);
  }

  async update(data: Question): Promise<void> {
    const questionIndex = this.questions.findIndex((q) => q.id === data.id);
    this.questions[questionIndex] = data;
  }

  async listManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = this.questions
      .sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      })
      .slice((page - 1) * 20, page * 20);

    return questions;
  }
}
export { QuestionRepositoryInMemory };
