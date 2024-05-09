import { CreateCommentOnAnswerUseCase } from './create-comment-on-answer';
import { AnswerRepositoryInMemory } from 'test/repositories/in-memory-answer-repository';
import { AnswerCommentRepositoryInMemory } from 'test/repositories/in-memory-answer-comment-repository';
import { makeAnswer } from 'test/factories/make-answer';

let answerRepositoryInMemory: AnswerRepositoryInMemory;
let answerCommentRepositoryInMemory: AnswerCommentRepositoryInMemory;
let sut: CreateCommentOnAnswerUseCase;

describe('Create a comment on  answer ', () => {
  beforeEach(() => {
    answerRepositoryInMemory = new AnswerRepositoryInMemory();
    answerCommentRepositoryInMemory = new AnswerCommentRepositoryInMemory();
    sut = new CreateCommentOnAnswerUseCase(
      answerRepositoryInMemory,
      answerCommentRepositoryInMemory
    );
  });
  test('should create a new  comment on answer', async () => {
    const answer = makeAnswer();
    await answerRepositoryInMemory.create(answer);
    const result = await sut.execute({
      authorId: '2',
      answerId: answer.id.toString(),
      content: 'Example comment',
    });

    expect(result.value?.answerComment.content).toEqual('Example comment');
    expect(answerRepositoryInMemory.answers[0].id).toEqual(answer.id);
  });
});
