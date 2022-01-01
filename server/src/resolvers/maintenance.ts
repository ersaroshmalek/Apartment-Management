import { Members } from '../entity/Members';
import { Context } from 'src/types';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
} from 'type-graphql';
import { Maintenance } from '../entity/Maintenance';

@InputType()
class AddMaintenance {
  @Field()
  email: string;

  @Field()
  flatNo: number;

  @Field()
  date: string;

  @Field()
  amountPaid: number;
}

@ObjectType()
class Output {
  @Field()
  flatNo: number;
  @Field()
  due: number;
  @Field()
  amount: number;
}

export class MaintenanceResolver {
  @Mutation(() => Output)
  async addMaintenance(
    @Arg('options') options: AddMaintenance,
    @Ctx() { em }: Context
  ) {
    const output = new Output();
    try {
      const result = await em.findOne(Members, { flatNo: options.flatNo });
      if (!result) {
        throw new Error('flat id not found');
      }

      // add Monthly maintenance paid
      const data = await em.create(Maintenance, options);
      await em.persistAndFlush(data);

      if (data) {
        const calAmnt = result?.amountDue + options.amountPaid;
        result.amountDue = calAmnt;
        // update total due or advance in Members collection
        const newMem = await em.create(Members, result);
        await em.persistAndFlush(newMem);
        output.flatNo = options.flatNo;
        output.due = newMem.amountDue;
        output.amount = data.amountPaid;
      }
    } catch (error) {
      throw new Error(error.message);
    }
    return output;
  }

  @Query(() => [Members])
  async getPendingMembers(@Ctx() { em }: Context): Promise<Members[]> {
    const res = await em.find(Members, { amountDue: { $lt: 0 } });
    console.log(res);

    return await em.find(Members, { amountDue: { $lt: 0 } });
  }

  @Query(() => [Members])
  async getAllMembers(@Ctx() { em }: Context): Promise<Members[]> {
    return await em.find(Members, {});
  }
}
