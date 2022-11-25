import { UnitName } from 'src/stylotron/src/Unit';
import { ClassNameRecord } from 'src/core/Node';

export type DefaultClassName = string | Record<UnitName, string>;
//
// export const defaultUnits: Record<keyof ClassNameRecord, DefaultClassName> = {
//   mt: 'mt-0',
//   mr: 'mr-0',
//   mb: 'mb-0',
//   ml: 'ml-0',
//   pt: 'pt-0',
//   pr: 'pr-0',
//   pb: 'pb-0',
//   pl: 'pl-0',
//   t: 't-0',
//   r: 'r-0',
//   b: 'b-0',
//   l: 'l-0',
//   h: {
//     '%': 'h-100-p',
//     px: 'h-300',
//     vh: 'h-100-vh',
//   } as DefaultClassName,
//   w: {
//     '%': 'w-100-p',
//     px: 'w-1200',
//     vh: 'w-100-vh',
//   } as DefaultClassName,
// };
