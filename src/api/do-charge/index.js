import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, sendChargeRequest } from './controller'
import { schema } from './model'
export DoCharge, { schema } from './model'

const router = new Router()
const { serviceName, msisdn, amount } = schema.tree

/**
 * @api {post} /do-charges Create do charge
 * @apiName CreateDoCharge
 * @apiGroup DoCharge
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam serviceName Do charge's serviceName.
 * @apiParam msisdn Do charge's msisdn.
 * @apiParam amount Do charge's amount.
 * @apiSuccess {Object} doCharge Do charge's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Do charge not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ serviceName, msisdn, amount }),
  create)

/**
 * @api {get} /do-charges Retrieve do charges
 * @apiName RetrieveDoCharges
 * @apiGroup DoCharge
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of do charges.
 * @apiSuccess {Object[]} rows List of do charges.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /do-charges Retrieve do charges
 * @apiName RetrieveDoCharges
 * @apiGroup DoCharge
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of do charges.
 * @apiSuccess {Object[]} rows List of do charges.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/send',
  query(),
  sendChargeRequest)


/**
 * @api {get} /do-charges/:id Retrieve do charge
 * @apiName RetrieveDoCharge
 * @apiGroup DoCharge
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} doCharge Do charge's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Do charge not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /do-charges/:id Update do charge
 * @apiName UpdateDoCharge
 * @apiGroup DoCharge
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam serviceName Do charge's serviceName.
 * @apiParam msisdn Do charge's msisdn.
 * @apiParam amount Do charge's amount.
 * @apiSuccess {Object} doCharge Do charge's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Do charge not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ serviceName, msisdn, amount }),
  update)

/**
 * @api {delete} /do-charges/:id Delete do charge
 * @apiName DeleteDoCharge
 * @apiGroup DoCharge
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Do charge not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)


export default router
