import { Request, Response } from 'express'

import MovieControllerExpressInterface from '../../../domain/interfaces/MovieControllerExpressInterface'
import MovieUseCasePort from '../../../domain/port/driver/MovieUseCasePort'
import MovieToJson from './MovieToJson'
import MovieUseCasePortById from '../../../domain/port/driver/MovieUseCasePortById'

export default class MovieControllerExpress
  implements MovieControllerExpressInterface
{
  constructor(
    private readonly movieUseCase: MovieUseCasePort,
    private readonly movieUseCaseById: MovieUseCasePortById
  ) {}

  public getMovies = (_req: Request, res: Response): void => {
    const movies = this.movieUseCase.getMovies()
    const movies_json = MovieToJson.get(movies)

    if(movies_json.length === 0) {
      res.status(404).json({ message: 'Movies not found' })
    }

    res.status(200).json({movies: movies_json})
  }

  public getMovieById = (req: Request, res: Response): void => {
    const id = req.params['id']
    if(!id){
      res.status(404).json({ message: 'idNoVaid' })
    }
    const idNumber = Number(id)
    const moviesById = this.movieUseCaseById.getMoviesById(idNumber.);
    const movies_json = MovieToJson.get([moviesById])

    if(movies_json.length === 0) {
      res.status(404).json({ message: 'Movies not found' })
    }

    res.status(200).json({movies: movies_json})
  }
}