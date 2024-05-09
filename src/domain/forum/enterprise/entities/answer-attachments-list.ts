import { WatchedList } from '@/core/entities/watched-list';
import { QuestionAttachments } from './question-attachment';

export class AnswerAttachmentList extends WatchedList<QuestionAttachments> {
  compareItems(a: QuestionAttachments, b: QuestionAttachments): boolean {
    return a.attachmentId === b.attachmentId;
  }
}
