import { Node } from './Node'
import { Uuid } from 'src/core/store/modules/template/reducer';

export class ExtendedNode extends Node {

  childIndex: number;
  deepIndex: number;
  parentId: Uuid | undefined;
  children: ExtendedNode[]
  xPath: string

  constructor(params: Required<ExtendedNode> & Partial<ExtendedNode>) {
    super(params);
    this.childIndex = params.childIndex
    this.deepIndex = params.deepIndex
    this.children = params.children || []
    this.parentId = params.parentId
    this.xPath = params.xPath
  }
}