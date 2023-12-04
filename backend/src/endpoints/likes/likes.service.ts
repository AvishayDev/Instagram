import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like } from "src/Tables/Like";
import { Repository } from "typeorm";
import { SignLikeDB } from "./dbtypes/SignLike.db";



@Injectable()
export class LikesService {

    constructor(
        @InjectRepository(Like) private likesRepository: Repository<Like>,
    ){}

    getAllLikes(){
        return this.likesRepository.find();
    }

    signLike(signLikeDB:SignLikeDB){
        // check user is exists
        // check post is exists
        // add like row
        // return it
    }
}