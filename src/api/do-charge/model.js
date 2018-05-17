import mongoose, { Schema } from 'mongoose'

const doChargeSchema = new Schema({
  serviceName: {
    type: String
  },
  msisdn: {
    type: String
  },
  amount: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

doChargeSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      serviceName: this.serviceName,
      msisdn: this.msisdn,
      amount: this.amount,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('DoCharge', doChargeSchema)

export const schema = model.schema
export default model
