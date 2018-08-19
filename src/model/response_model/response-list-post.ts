import {ResponseListBase} from './response-list-base';
import {Post} from '../database_model/index';

export class RequestListPost<Post> extends ResponseListBase<Post>{
    constructor(page?: number, perPage?: number, data?: Array<Post>){
        super(page, perPage, data);
    }
}