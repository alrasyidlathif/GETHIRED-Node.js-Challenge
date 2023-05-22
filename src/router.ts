import { Router } from 'express';

import activitiesRouter from './activities/activities.router';
import todosRouter from './todos/todos.router';

const router = Router()

router.use('/activity-groups', activitiesRouter)
router.use('/todo-items', todosRouter)

export default router
