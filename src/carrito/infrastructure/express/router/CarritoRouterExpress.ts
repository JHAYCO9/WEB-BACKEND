import { Router } from 'express'
import CarritoRouterExpressInterface from '../../../domain/interfaces/CarritoRouterExpressInterface'
import CarritoControllerExpressInterface from '../../../domain/interfaces/CarritoControllerExpressInterface'

/**
 * Express Router implementation for shopping cart functionality
 * Handles all HTTP routes related to shopping cart operations
 */
export default class CarritoRouterExpress implements CarritoRouterExpressInterface {
  router: Router
  path: string

  /**
   * Creates a new CarritoRouterExpress instance
   * @param carritoController - The controller that handles shopping cart business logic
   */
  constructor(
    private readonly carritoController: CarritoControllerExpressInterface
  ) {
    this.router = Router()
    this.path = '/carrito/v1.0'
    this.routes()
  }

  /**
   * Initializes all routes for the shopping cart
   */
  public routes = (): void => {
    this.configureCarrito()
  }

  /**
   * Configures all shopping cart routes with their respective controller methods
   */
  public configureCarrito = (): void => {
    /**
     * GET /carrito
     * Retrieves the current user's shopping cart contents
     */
    this.router.get(
      '/carrito',
      this.carritoController.getCarrito.bind(this.carritoController)
    )
    /**
     * GET /carritoResumido
     * Retrieves the current user's shopping cart-resumed contents
     */
      this.router.get(
        '/carritoResumido',
        this.carritoController.getCarritoResumido.bind(this.carritoController)
      )
    

    /**
     * POST /carrito/create
     * Creates a new shopping cart for the user
     */
    this.router.post(
      '/carrito/create',
      this.carritoController.createCarrito.bind(this.carritoController)
    )

    /**
     * POST /carrito/items/add/:itemId
     * Adds a specific item to the shopping cart
     */
    this.router.post(
      '/carrito/items/add/:itemId',
      this.carritoController.addItemToCarrito.bind(this.carritoController)
    )

    /**
     * PUT /carrito/items/increment/:itemId
     * Increases the quantity of a specific item in the shopping cart
     */
    this.router.put(
      '/carrito/items/increment/:itemId',
      this.carritoController.aumentaCanitadItemProductoCarrito.bind(this.carritoController)
    )

    /**
     * PUT /carrito/items/reduce/:itemId
     * Reduces the quantity of a specific item in the shopping cart
     * Note: This appears to be using deleteItemFromCarrito which might be incorrect
     */
    this.router.put(
      '/carrito/items/reduce/:itemId',
      this.carritoController.deleteItemFromCarrito.bind(this.carritoController)
    )

    /**
     * DELETE /carrito/items/remove/:itemId
     * Completely removes a specific item from the shopping cart
     */
    this.router.delete(
      '/carrito/items/remove/:itemId',
      this.carritoController.deleteItemFromCarrito.bind(this.carritoController)
    )

    /**
     * POST /carrito/checkout
     * Processes the checkout of the shopping cart
     * Updates the cart status to indicate it's being processed
     */
    this.router.post(
      '/carrito/checkout',
      this.carritoController.updateStatusCarrito.bind(this.carritoController)
    )
  }
}
