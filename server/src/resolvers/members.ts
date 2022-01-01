import { Members } from '../entity/Members';
import { Context } from 'src/types';
import { Arg, Ctx, Field, InputType, Mutation, Query } from 'type-graphql';

@InputType()
export class NewMember {
  @Field()
  email: string;

  @Field()
  flatNo: number;

  @Field()
  contact: number;

  @Field()
  fullName: string;

  @Field()
  amountDue: number;
}

export class MemberResolver {
  @Query(() => String)
  async hello() {
    return 'hellow';
  }

  @Query(() => [Members])
  async getMembers(@Ctx() { em }: Context): Promise<Members[]> {
    return await em.find(Members, {});
  }

  @Mutation(() => Members)
  async registerMember(
    @Arg('options') options: NewMember,
    @Ctx() { em }: Context
  ): Promise<Members> {
    let member = new Members();
    try {
      member = await em.create(Members, options);
      await em.persistAndFlush(member);
    } catch (error) {
      throw new Error(error);
    }
    return member;
  }
}
