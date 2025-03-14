import RouterExpressInterface from '../../../express/domain/RouterExpressInterface'

export default interface FavoritoRouterExpressInterface
  extends RouterExpressInterface {
    configureGetFavoritos: () => void
    configureAddFavoritos: () => void
    configureDeleteFavoritos: () => void
  }