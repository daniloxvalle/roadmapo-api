import { Router } from 'express'

import appUserRoute from './app_user_route'
import productRoute from './product_route'
import initiativeRoute from './initiative_route'
import timeframeRoute from './timeframe_route'
import solutionRoute from './solution_route'
import objectiveRoute from './objective_route'
import publicationRoute from './publication_route'

const router = Router()

router.use('/app-user', appUserRoute)
router.use('/product', productRoute)
router.use('/initiative', initiativeRoute)
router.use('/timeframe', timeframeRoute)
router.use('/solution', solutionRoute)
router.use('/objective', objectiveRoute)
router.use('/publication', publicationRoute)

export default router
