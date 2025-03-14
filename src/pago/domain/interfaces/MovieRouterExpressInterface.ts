import RouterExpressInterface from '../../../express/domain/RouterExpressInterface'

export default interface MovieRouterExpressInterface
  extends RouterExpressInterface {
    configureMovies: () => void
    configureMovieById: () => void
  }