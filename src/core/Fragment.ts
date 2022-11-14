import { v4 as uuid } from 'uuid';

type Attrs = {};

export class Fragment {
  name: string;
  id: string;
  className: string;
  attrs: Attrs;
  style: { [key: string]: string };
  tag: string;
  children: Fragment[] | never[];
  isText?: boolean
  text?: string

  constructor(params: Partial<Fragment>) {
    this.name = params.name || ''
    this.id = params.id || uuid()
    this.children = params.children || []
    this.className = params.className || ''
    this.attrs = params.attrs || {}
    this.style = params.style || {}
    this.tag = params.tag || params.isText ? 'span' : 'div'
    this.isText = params.isText || false
    this.text = params.text || ''
  }
}