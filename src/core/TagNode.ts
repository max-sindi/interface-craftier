import { v4 as uuid } from 'uuid';
import { Uuid } from 'src/core/store/modules/template/reducer';
import { StandardLonghandProperties } from 'csstype';

export type ClassNameRecord = Partial<
  Record<'w' | 'h' | 'pt' | 'pb' | 'pl' | 'pr' | 'mt' | 'mr' | 'mb' | 'ml' | 't' | 'b' | 'r' | 'l' | string, string>
>;
export type StyleRecord = StandardLonghandProperties;
export type AttrName = 'src' | 'title' | 'href' | 'placeholder' | 'value' | 'd' | 'stroke' | 'strokeWidth' | 'className' | 'width' |
'height' |
'viewBox' |
'fill' |
'xmlns' | 'attrs' | 'x' | 'y';
export type Attrs = Partial<Record<AttrName, any>>;

export type TagName =
  | 'div'
  | 'span'
  | 'input'
  | 'img'
  | 'a'
  | 'button'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'br'
  | 'svg'
  | 'path';

export const tags: TagName[] = ['div', 'span', 'input', 'img', 'a', 'button', 'h1', 'h2', 'h3', 'h4', 'h5', 'br'];
export const tagsWithNoChildren: TagName[] = ['input', 'img', 'br'];

export class TagNode {
  name: string;
  id: Uuid;
  className: ClassNameRecord;
  attrs: Attrs;
  style: StyleRecord;
  tag: TagName;
  children: TagNode[];
  isText: boolean;
  text: string;
  reactComponent: boolean;

  constructor(params: Partial<TagNode> = {}) {
    this.name = params.name || '';
    this.id = params.id || uuid();
    this.children = params.children || [];
    this.className = params.className || {};
    this.attrs = params.attrs || {};
    this.style = params.style || {};
    this.tag = params.tag || (params.isText ? 'span' : 'div');
    this.isText = params.isText || false;
    this.text = params.text || '';
    this.reactComponent = params.reactComponent || false;
  }

  addChild = (node: TagNode) => this.children.push(node);
}
