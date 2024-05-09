import { PaginationParams } from '@/core/repositories/pagination-params';
import { IAnswerRepository } from '@/domain/forum/application/repositories/IAnswer-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

class AnswerRepositoryInMemory implements IAnswerRepository {
  public answers: Answer[] = [];

  async create(answer: Answer): Promise<void> {
    this.answers.push(answer);
  }

  async findById(id: string): Promise<Answer | undefined> {
    return this.answers.find((a) => a.id.toString() === id);
  }
  async delete(id: string): Promise<void> {
    this.answers = this.answers.filter((a) => a.id.toString() !== id);
  }

  async update(data: Answer): Promise<void> {
    this.answers = this.answers.map((a) => {
      if (a.id.toString() === data.id.toString()) {
        return data;
      }
      return a;
    });
  }

  async listManyByQuestionId(
    questionId: string,
    params: PaginationParams
  ): Promise<Answer[]> {
    const answers = this.answers
      .filter((a) => a.questionId.toString() === questionId)
      .sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      })
      .slice((params.page - 1) * 20, params.page * 20);

    return answers;
  }
}

export { AnswerRepositoryInMemory };
