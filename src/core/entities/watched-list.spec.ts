import { WatchedList } from './watched-list';

class NumberWatchedList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b;
  }
}

describe('WatchedList', () => {
  it('should create a  watched list  with inital items', () => {
    const items = new NumberWatchedList([1, 2, 3]);
    expect(items.getItems()).toHaveLength(3);
  });

  it('should be able to add new itens to the list', () => {
    const items = new NumberWatchedList([1, 2, 3]);

    items.add(4);
    expect(items.getItems()).toHaveLength(4);
    expect(items.getNewItems()).toEqual([4]);
  });

  it('should be able to remove an itens from list', () => {
    const items = new NumberWatchedList([1, 2, 3]);

    items.remove(2);
    expect(items.getItems()).toHaveLength(2);
    expect(items.getRemovedItems()).toEqual([2]);
  });

  it('should be able to add a item even if it was removed before', () => {
    const items = new NumberWatchedList([1, 2, 3]);

    items.remove(2);
    items.add(2);
    expect(items.getItems()).toHaveLength(3);
    expect(items.getRemovedItems()).toEqual([]);
    expect(items.getNewItems()).toEqual([]);
  });
  it('should be able to remove a item even if it was add before', () => {
    const items = new NumberWatchedList([1, 2, 3]);

    items.add(4);
    items.remove(4);
    expect(items.getItems()).toHaveLength(3);
    expect(items.getRemovedItems()).toEqual([]);
    expect(items.getNewItems()).toEqual([]);
  });
  it('should be able to update list item', () => {
    const items = new NumberWatchedList([1, 2, 3]);

    items.update([1, 3, 5]);
    expect(items.getItems()).toHaveLength(3);
    expect(items.getRemovedItems()).toEqual([2]);
    expect(items.getNewItems()).toEqual([5]);
  });
});
