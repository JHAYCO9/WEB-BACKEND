import { Router } from 'express'
import FavoritoRouterExpressInterface from '../../../domain/interfaces/FavoritoRouterExpressInterface'
import FavoritoControllerExpressInterface from '../../../domain/interfaces/FavoritoControllerExpressInterface'

export default class FavoritoRouterExpress implements FavoritoRouterExpressInterface {
  router: Router
  path: string

  constructor(
    private readonly movieController: FavoritoControllerExpressInterface
  ) {
    this.router = Router()
    this.path = '/favorito/v1.0'
    this.routes()
  }
  public routes = (): void => {
    this.configureGetFavoritos();
    this.configureAddFavoritos();
    this.configureDeleteFavoritos();
  }

  configureGetFavoritos = (): void => {
    this.router.get('/favoritos/:idUsuario', this.movieController.getFavoritosUser.bind(this.movieController))
  }

  configureAddFavoritos = (): void => {
    this.router.post('/addfavoritos', this.movieController.addFavoritoUse.bind(this.movieController))
  }

  configureDeleteFavoritos = (): void => {
    this.router.delete('/delfavoritos/:id', this.movieController.deleteFavoritoUse.bind(this.movieController))
  }

}
