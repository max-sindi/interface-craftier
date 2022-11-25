export interface LoadableField {
  loading: boolean;
  error: null | Error;
}

export const setLoadingStart = (field: LoadableField) => {
  field.loading = true;
  field.error = null;
};

export const setLoadingSuccess = (field: LoadableField) => {
  field.loading = false;
  field.error = null;
};

export const setLoadingFailure = (field: LoadableField, error: any) => {
  field.loading = false;
  field.error = error;
};
