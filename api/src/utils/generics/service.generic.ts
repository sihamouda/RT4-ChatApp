import { FilterQuery } from 'mongoose';
import { PageQueryDto } from '../pagination/pagination-query.dto';
import { BaseRepository } from './repositoy.generic';

export abstract class BaseService<T, C, U> {
  constructor(private readonly repository: BaseRepository<T, C, U>) {}

  async findAll(): Promise<T[]> {
    return await this.repository.findAllQuery();
  }

  async find(filter: FilterQuery<T>): Promise<T[]> {
    return await this.repository.find(filter);
  }

  async findPage(pageQueryDto: PageQueryDto, populate?: string): Promise<T[]> {
    return await this.repository.findPageQuery(pageQueryDto, populate);
  }

  async createMany(dtoArray: C[]): Promise<T[]> {
    return await this.repository.createManyQuery(dtoArray);
  }
  async countAll(): Promise<number> {
    return await this.repository.countAllQuery();
  }

  async findOne(id: string, populate?: string): Promise<T> {
    return await this.repository.findOneQuery(id, populate);
  }

  async create(user: C , options?:object): Promise<T> {
    return await this.repository.createQuery(user);
  }

  async updateOne(id: string, userUpdate: U, options?:object): Promise<T> {
    return await this.repository.updateOneQuery(id, userUpdate);
  }

  async deleteOne(id: string) {
    return await this.repository.deleteOneQuery(id);
  }
}
