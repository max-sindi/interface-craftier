import mongoose from "mongoose"
const todosSchema  = new mongoose.Schema({
  commentBody: {type: String},
  targetUserId: {type: mongoose.Types.ObjectId}
})

// add id same as _id
todosSchema.virtual('id').get(function() {return this._id})
todosSchema.set('toJSON', {
  virtuals: true
});

const Todo = mongoose.model('Comment', todosSchema)

export default Todo