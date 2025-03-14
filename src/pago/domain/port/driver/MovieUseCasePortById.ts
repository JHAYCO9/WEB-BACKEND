import Movie from '../../movie/Movie'

export default interface MovieUseCasePortById {
  getMoviesById(id:number): Movie
}