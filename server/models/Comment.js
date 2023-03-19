import mongoose from "mongoose"
// import searchable from 'mongoose-searchable'
const todosSchema  = new mongoose.Schema({
  // title: {type: String,},
  // body: {type: String, },
  // isDone: {type: Boolean, default: false}
  commentBody: {type: String},
  targetUserId: {type: mongoose.Types.ObjectId}
})

// todosSchema.plugin(searchable)

// add id same as _id
todosSchema.virtual('id').get(function() {return this._id})
todosSchema.set('toJSON', {
  virtuals: true
});

const Todo = mongoose.model('Comment', todosSchema)

export default Todo