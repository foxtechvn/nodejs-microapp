import { success, notFound } from '../../services/response/'
import { Dnd } from '.'

export const create = ({ body }, res, next) =>
  Dnd.create(body)
    .then((dnd) => dnd.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Dnd.count(query)
    .then(count => Dnd.find(query, select, cursor)
      .then((dnds) => ({
        count,
        rows: dnds.map((dnd) => dnd.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Dnd.findById(params.id)
    .then(notFound(res))
    .then((dnd) => dnd ? dnd.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  Dnd.findById(params.id)
    .then(notFound(res))
    .then((dnd) => dnd ? Object.assign(dnd, body).save() : null)
    .then((dnd) => dnd ? dnd.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Dnd.findById(params.id)
    .then(notFound(res))
    .then((dnd) => dnd ? dnd.remove() : null)
    .then(success(res, 204))
    .catch(next)
