import { v4 as uuid } from 'uuid';
import { Uuid } from 'src/core/store/modules/template/reducer';
import { StandardLonghandProperties } from 'csstype';

export type ClassNameRecord = Partial<Record<'w' | 'h' | 'pt' | 'pb' | 'pl' | 'pr' | 'mt' | 'mr' | 'mb' | 'ml' | 't' | 'b' | 'r' | 'l' | string, string>>
export type StyleRecord = StandardLonghandProperties
export type Attrs = Record<string , string>

export class TagNode {
  name: string;
  id: Uuid;
  className: ClassNameRecord;
  attrs: Attrs;
  style: StyleRecord;
  tag: string;
  children: TagNode[];
  isText: boolean
  text: string

  constructor(params: Partial<TagNode> = {}) {
    this.name = params.name || ''
    this.id = params.id || uuid()
    this.children = params.children || []
    this.className = params.className || {}
    this.attrs = params.attrs || {}
    this.style = params.style || {}
    this.tag = params.tag || (params.isText ? 'span' : 'div')
    this.isText = params.isText || false
    this.text = params.text || ''
  }
}