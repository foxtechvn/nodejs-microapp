import { DoCharge } from '.'

let doCharge

beforeEach(async () => {
  doCharge = await DoCharge.create({ serviceName: 'test', msisdn: 'test', amount: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = doCharge.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(doCharge.id)
    expect(view.serviceName).toBe(doCharge.serviceName)
    expect(view.msisdn).toBe(doCharge.msisdn)
    expect(view.amount).toBe(doCharge.amount)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = doCharge.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(doCharge.id)
    expect(view.serviceName).toBe(doCharge.serviceName)
    expect(view.msisdn).toBe(doCharge.msisdn)
    expect(view.amount).toBe(doCharge.amount)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
