import { Resolver, Query, Args, Int, Context } from '@nestjs/graphql';
import { Company, CompaniesData } from 'src/models';
import { CompanyService } from 'src/services/company.service';

/**
 * Query Resolver para Companies
 */
@Resolver((of) => Company)
export class CompanyResolver {
  constructor(private companyService: CompanyService) {}

  @Query((returns) => Company, { description: 'Lista uma company por "id"' })
  async company(
    @Args('id', {
      type: () => Int,
      description: '"id" da Company a ser listada',
    })
    id: number,
    @Context() context,
  ) {
    return this.companyService.find(id, context);
  }

  @Query((returns) => CompaniesData, {
    description: 'Lista Companies para paginação',
  })
  async companies(
    @Args('skip', {
      type: () => Int,
      nullable: true,
      description: 'Quantidade de registros "pulados" (paginação)',
      defaultValue: 0,
    })
    skip: number,
    @Args('total', {
      type: () => Int,
      nullable: true,
      description: 'Quantidade total de registros a serem listados',
      defaultValue: 10,
    })
    total: number,
    @Context() context,
  ): Promise<CompaniesData> {
    return this.companyService.findAll(skip, total, context);
  }
}
