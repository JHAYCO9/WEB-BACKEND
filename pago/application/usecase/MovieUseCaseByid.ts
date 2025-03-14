import Movie from '../../domain/movie/Movie'
import NullMovie from '../../domain/movie/NullMovie'
import MovieUseCasePortById from '../../domain/port/driver/MovieUseCasePortById'

export default class MovieUseCaseById implements MovieUseCasePortById {
  
  public getMoviesById(_id: number): Movie {
    const movies = new NullMovie()
    return movies
  }
}
