import { Field, Int, ObjectType } from '@nestjs/graphql';

/**
 * UserName Model
 */
@ObjectType()
export class UserName {
  @Field()
  first: string;

  @Field()
  last: string;
}

/**
 * GeoLocation Model
 */
@ObjectType()
export class GeoLocation {
  @Field()
  latitude: string;

  @Field()
  longitude: string;
}

/**
 * User Model
 */
@ObjectType()
export class User {
  @Field((type) => Int)
  id: number;

  @Field()
  isEmployed: boolean;

  _birthDate: string;

  @Field((type) => UserName)
  name: UserName;

  @Field()
  picture: string;

  @Field((type) => Int)
  companyId: number;

  @Field()
  email: string;

  @Field()
  address: string;

  @Field()
  about: string;

  @Field()
  registered: number;

  @Field((type) => GeoLocation)
  geoLocation: GeoLocation;

  @Field((type) => [String])
  tags: String[];

  @Field((type) => [Int])
  friends: number[];

  @Field()
  favoriteFruit: string;
}

/**
 * UsersData Model
 * Usado para retornar vários Users e incluir o total de users
 * no "banco de dados". Útil para paginação.
 */
@ObjectType()
export class UsersData {
  @Field((type) => [User])
  data?: User[];

  @Field((type) => Int)
  total: number;
}
