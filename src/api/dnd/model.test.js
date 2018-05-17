import { Dnd } from '.'

let dnd

beforeEach(async () => {
  dnd = await Dnd.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = dnd.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(dnd.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = dnd.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(dnd.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
