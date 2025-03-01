import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ClassConstructor } from 'class-transformer/types/interfaces';

function validateConfig<T extends object>(
  config: Record<string, unknown>,
  envVariablesClass: ClassConstructor<T>,
) {
  const validatedConfig = plainToClass(envVariablesClass, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

export default validateConfig;

/*
    plainToClass: muito usado para transformar objetos simples (plain object) em instancia de uma 
    outra classe, util para usar antes de validações

    validateSync: util para verificar sincronamente se a instancia de classe cumpre as regras estipuladas

    classContructor: serve como uma representação genérica de um contrutor de classe,
    é util para a função conseguir trabalhar com qualquer classe passada como parâmetro

    
*/
