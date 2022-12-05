import { Uuid } from 'src/core/store/modules/template/reducer';
import { TagNode } from 'src/core/TagNode';

export class ExtendedNode extends TagNode {

  childIndex: number;
  deepIndex: number;
  parentId: Uuid | undefined;
  children: ExtendedNode[]
  xPath: string
  childrenCollapsed: boolean

  constructor(params: Required<ExtendedNode> & Partial<ExtendedNode>) {
    super(params);
    this.childIndex = params.childIndex
    this.deepIndex = params.deepIndex
    this.children = params.children || []
    this.parentId = params.parentId
    this.xPath = params.xPath
    this.childrenCollapsed = false
  }
}