import { PaginationParams } from '@/core/repositories/pagination-params';
import { IQuestionCommentsRepository } from '@/domain/forum/application/repositories/IQuestionComments-repository';
import { QuestionComments } from '@/domain/forum/enterprise/entities/question-comment';

class QuestionCommentCommentRepositoryInMemory
  implements IQuestionCommentsRepository
{
  public questionComments: QuestionComments[] = [];
  async create(questionComment: QuestionComments): Promise<void> {
    this.questionComments.push(questionComment);
  }

  async findById(id: string): Promise<QuestionComments | undefined> {
    return this.questionComments.find(
      (questionComment) => questionComment.id.toString() === id
    );
  }
  async delete(data: QuestionComments): Promise<void> {
    const questionCommentIndex = this.questionComments.findIndex(
      (questionComment) => questionComment.id === data.id
    );
    this.questionComments.splice(questionCommentIndex, 1);
  }

  async fetchCommentsFromQuestion(
    questionId: string,
    params: PaginationParams
  ): Promise<QuestionComments[]> {
    const { page } = params;
    return this.questionComments
      .filter(
        (questionComment) =>
          questionComment.questionId.toString() === questionId
      )
      .slice((page - 1) * 20, page * 20);
  }
}
export { QuestionCommentCommentRepositoryInMemory };
