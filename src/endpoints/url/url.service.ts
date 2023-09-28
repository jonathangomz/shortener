import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Url, UrlDocument } from './entities/url.entity';
import { Model } from 'mongoose';

@Injectable()
export class UrlService {
  private baseShortUrl: string;

  constructor(@InjectModel(Url.name) private urlModel: Model<Url>) {
    this.baseShortUrl = 'https://gb.com'
  }

  async create(newUrl: string): Promise<{ url: string; }> {
    // If exist return the shortened url
    const url: UrlDocument = await this.urlModel.findOne({ url: newUrl });
    if(url) {
      return { url: url.shortenedUrl }
    }

    let shortenedUrl: string = this.shortenUrl(newUrl);
    
    await this.urlModel.create({url: newUrl, shortenedUrl});
    
    return {
      url: shortenedUrl
    };
  }

  findOne(url: string) {
    return this.urlModel.findOne({shortenedUrl: url}, {url: true, _id: false});
  }

  private shortenUrl(url: string): string {
    let id: string = this.generateId(5);
    return `${this.baseShortUrl}/${id}`;
  }

  private generateId(length: number): string {
    let result: string = '';
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength: number = characters.length;
    let counter: number = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
}
