import { PartialType } from "@nestjs/mapped-types";
import { CreateMovieDTO } from "./create-movie.dto";

// all params are now optional
export class UpdateMovieDTO extends PartialType(CreateMovieDTO){}