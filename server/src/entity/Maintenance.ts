import {
  BaseEntity,
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Maintenance extends BaseEntity<Maintenance, '_id'> {
  @Field(() => String)
  @PrimaryKey()
  _id!: ObjectId;

  @Field()
  @SerializedPrimaryKey()
  id!: string;

  @Field()
  @Property({ type: 'number' })
  flatNo!: number;

  @Field()
  @Property({ type: 'string' })
  email!: string;

  @Field()
  @Property({ type: 'text' })
  date!: string;

  @Field()
  @Property()
  amountPaid!: number;

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt = new Date();
}
