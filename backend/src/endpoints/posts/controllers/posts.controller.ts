import { Controller } from "@nestjs/common";
import { PostsService } from "../services/posts.service";




@Controller('posts')
export class PostsController {

    constructor(private readonly postsService: PostsService){}

}