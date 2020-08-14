import {
  Resolver,
  Query,
  Args,
  Int,
  Parent,
  ResolveField,
  Context,
} from '@nestjs/graphql';
import { User, UsersData, Company } from 'src/models';
import { UserService } from 'src/services/user.service';
import { CompanyService } from 'src/services/company.service';

/**
 * Query Resolver para Users
 */
@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private companyService: CompanyService,
  ) {}

  @Query((returns) => User, { description: 'Lista um user por "id"' })
  async user(
    @Args('id', {
      type: () => Int,
      description: '"id" do User a ser listado',
    })
    id: number,
  ) {
    return this.userService.find(id);
  }

  @Query((returns) => UsersData, {
    description: 'Lista Users para paginação',
  })
  async users(
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
  ): Promise<UsersData> {
    return this.userService.findAll(skip, total, context);
  }

  @ResolveField((returns) => Int)
  async age(@Parent() user: User): Promise<number> {
    return this.calculateAge(new Date(user._birthDate));
  }

  @ResolveField((returns) => Company)
  async company(@Parent() user: User, @Context() context): Promise<Company> {
    return this.companyService.find(user.companyId, context);
  }

  private calculateAge(birthday) {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
