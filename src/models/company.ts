import { Field, Int, ObjectType } from '@nestjs/graphql';

/**
 * Company Model
 */
@ObjectType()
export class Company {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  phone: string;

  @Field()
  address: string;
}

/**
 * CompaniesData Model
 * Usado para retornar várias Companies e incluir o total de companies
 * no "banco de dados". Útil para paginação.
 */
@ObjectType()
export class CompaniesData {
  @Field((type) => [Company])
  data?: Company[];

  @Field((type) => Int)
  total: number;
}
