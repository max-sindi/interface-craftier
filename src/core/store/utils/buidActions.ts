import { createAction } from '@reduxjs/toolkit';
import { lastArrayItem } from 'src/utils';

type Action = ReturnType<typeof createAction> | string;

export const success = (action: Action): string => String(action) + '_SUCCESS';
export const failure = (action: Action): string => String(action) + '_FAILURE';

export const isSuccess = (action: Action): boolean => lastArrayItem(String(action).split('_')) === 'SUCCESS';
export const isFailure = (action: Action): boolean => lastArrayItem(String(action).split('_')) === 'FAILURE';
