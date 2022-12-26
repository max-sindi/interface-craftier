import { TagNode } from 'src/core/TagNode';
import {
  collectNodeAllSiblings ,
  collectNodeAppendingSiblings , collectNodeChildrenRecursively ,
  collectNodePrependingSiblings , collectNodeSiblingsChildren , nodeDeepnessSelector ,
} from 'src/core/store/modules/template/selector';
import { destructTree } from 'src/utils';

const template = new TagNode({
  id: '0',
  children: [
    new TagNode({ id: '1', children: [new TagNode({ children: [new TagNode(), new TagNode()] }), new TagNode()] }),
    new TagNode({ id: '2' }),
    new TagNode({ id: '3' }),
    new TagNode({ id: '4' }),
    new TagNode({}),
    new TagNode({}),
  ],
});
const { nodesMap } = destructTree({ template, variables: {} }, {});

test('siblings count', () => {
  expect(collectNodePrependingSiblings(nodesMap['3'], nodesMap).length).toBe(2);
  expect(collectNodeAppendingSiblings(nodesMap['3'], nodesMap).length).toBe(3);
  expect(collectNodePrependingSiblings(nodesMap['4'], nodesMap).length).toBe(3);
  expect(collectNodeAppendingSiblings(nodesMap['4'], nodesMap).length).toBe(2);
  expect(collectNodeAllSiblings(nodesMap['4'], nodesMap).length).toBe(5);
  expect(collectNodeAllSiblings(nodesMap['3'], nodesMap).length).toBe(5);
});

test('children', () => {
  expect(collectNodeChildrenRecursively(nodesMap['3'], nodesMap).length).toBe(0)
  expect(collectNodeChildrenRecursively(nodesMap['2'], nodesMap).length).toBe(0)
  expect(collectNodeChildrenRecursively(nodesMap['1'], nodesMap).length).toBe(4)
  expect(collectNodeChildrenRecursively(nodesMap['0'], nodesMap).length).toBe(10)
})

test('prepending siblings children', () => {
  expect(collectNodeSiblingsChildren(nodesMap['3'], nodesMap, collectNodePrependingSiblings).length).toBe(4)
  expect(collectNodeSiblingsChildren(nodesMap['4'], nodesMap, collectNodePrependingSiblings).length).toBe(4)
});

test('node deepness selector', () => {
  expect(nodeDeepnessSelector(nodesMap['0'], nodesMap)).toBe(1)
  expect(nodeDeepnessSelector(nodesMap['1'], nodesMap)).toBe(2)
  expect(nodeDeepnessSelector(nodesMap['2'], nodesMap)).toBe(7)
  expect(nodeDeepnessSelector(nodesMap['3'], nodesMap)).toBe(8)
})