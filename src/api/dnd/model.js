import mongoose, { Schema } from 'mongoose'

const dndSchema = new Schema({}, { timestamps: true })

dndSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Dnd', dndSchema)

export const schema = model.schema
export default model
