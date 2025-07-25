import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Announcement } from './announcement.model';
import { CreateAnnouncementInput } from './dto/create-announcement.input';

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectModel(Announcement.name)
    private readonly announcementModel: Model<Announcement>,
  ) {}

  async create(input: CreateAnnouncementInput): Promise<Announcement> {
    const created = new this.announcementModel({
      ...input,
      timestamp: input.timestamp ?? new Date(),
    });
    return created.save();
  }

  async findAll(): Promise<Announcement[]> {
    return this.announcementModel.find().sort({ timestamp: -1 }).exec();
  }


}
