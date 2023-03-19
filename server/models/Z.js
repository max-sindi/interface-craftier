import mongoose from "mongoose"
const {Types} = mongoose.Schema


const schema = new mongoose.Schema({
  template: Object,
  // css: Object,
})

const Model = mongoose.model('Z', schema)

export default Model