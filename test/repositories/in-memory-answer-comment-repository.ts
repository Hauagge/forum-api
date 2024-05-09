import { PaginationParams } from '@/core/repositories/pagination-params';
import { IAnswerCommentsRepository } from '@/domain/forum/application/repositories/IAnswerComments-repository';
import { AnswerComments } from '@/domain/forum/enterprise/entities/answer-comment';

class AnswerCommentRepositoryInMemory implements IAnswerCommentsRepository {
  answerComments: AnswerComments[] = [];

  async create(data: AnswerComments) {
    this.answerComments.push(data);
  }

  async delete(data: AnswerComments): Promise<void> {
    const answerCommentIndex = this.answerComments.findIndex(
      (answerComment) => answerComment.id === data.id
    );
    this.answerComments.splice(answerCommentIndex, 1);
  }
  async findById(id: string): Promise<AnswerComments | undefined> {
    return this.answerComments.find(
      (answerComment) => answerComment.id.toString() === id
    );
  }

  async fetchCommentsFromAnswer(
    answerId: string,
    params: PaginationParams
  ): Promise<AnswerComments[]> {
    const { page } = params;
    return this.answerComments
      .filter((answerComment) => answerComment.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20);
  }
}

export { AnswerCommentRepositoryInMemory };
