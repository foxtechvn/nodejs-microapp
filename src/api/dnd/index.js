import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy } from './controller'
export Dnd, { schema } from './model'

const router = new Router()

/**
 * @api {post} /dnds Create dnd
 * @apiName CreateDnd
 * @apiGroup Dnd
 * @apiSuccess {Object} dnd Dnd's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Dnd not found.
 */
router.post('/',
  create)

/**
 * @api {get} /dnds Retrieve dnds
 * @apiName RetrieveDnds
 * @apiGroup Dnd
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of dnds.
 * @apiSuccess {Object[]} rows List of dnds.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /dnds/:id Retrieve dnd
 * @apiName RetrieveDnd
 * @apiGroup Dnd
 * @apiSuccess {Object} dnd Dnd's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Dnd not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /dnds/:id Update dnd
 * @apiName UpdateDnd
 * @apiGroup Dnd
 * @apiSuccess {Object} dnd Dnd's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Dnd not found.
 */
router.put('/:id',
  update)

/**
 * @api {delete} /dnds/:id Delete dnd
 * @apiName DeleteDnd
 * @apiGroup Dnd
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Dnd not found.
 */
router.delete('/:id',
  destroy)

export default router
