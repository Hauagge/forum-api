import { CommentOnQuestionUseCase } from './create-comment-on-question';
import { QuestionRepositoryInMemory } from 'test/repositories/in-memory-questions-repository';
import { QuestionCommentCommentRepositoryInMemory } from 'test/repositories/in-memory-questions-comments-repository';
import { makeQuestion } from 'test/factories/make-question';

let questionRepositoryInMemory: QuestionRepositoryInMemory;
let questionCommentRepositoryInMemory: QuestionCommentCommentRepositoryInMemory;
let sut: CommentOnQuestionUseCase;

describe('Create a comment on  question ', () => {
  beforeEach(() => {
    questionRepositoryInMemory = new QuestionRepositoryInMemory();
    questionCommentRepositoryInMemory =
      new QuestionCommentCommentRepositoryInMemory();
    sut = new CommentOnQuestionUseCase(
      questionRepositoryInMemory,
      questionCommentRepositoryInMemory
    );
  });
  test('should create a new  comment on question', async () => {
    const question = makeQuestion();
    await questionRepositoryInMemory.create(question);
    const result = await sut.execute({
      authorId: '2',
      questionId: question.id.toString(),
      content: 'Example comment',
    });

    expect(result.value?.questionComment.content).toEqual('Example comment');
    expect(questionRepositoryInMemory.questions[0].id).toEqual(question.id);
  });
});
