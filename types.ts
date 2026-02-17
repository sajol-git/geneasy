export enum PromptType {
  PHOTO = 'PHOTO',
  DESCRIPTION = 'DESCRIPTION',
  AD_COPY = 'AD_COPY'
}

export interface GeneratedResult {
  text?: string;
  imageUrl?: string;
  loading: boolean;
  error?: string;
}
