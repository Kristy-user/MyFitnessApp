import { createAction } from '@reduxjs/toolkit';

export const gotApiError = createAction('ApiError');

export const clearApiError = createAction('ClearApiError');
