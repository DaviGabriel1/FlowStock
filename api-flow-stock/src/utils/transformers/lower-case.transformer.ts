import { TransformFnParams } from 'class-transformer/types/interfaces';
import { MaybeType } from '../types/maybe.type';

export const lowerCaseTransformer = (
  params: TransformFnParams
): MaybeType<string> => {
  const value = params.value as string | undefined;
  return value ? value.toLowerCase().trim() : undefined;
};
