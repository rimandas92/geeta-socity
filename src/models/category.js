import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

/**
 * Category model design.
 * @returns {mongooseModel} it returns the schema model of books
 */
const category = new Schema({
    title:{
        type: String,
        required:true
    },
    isActive:{
        type:String,
        default:'true'
    }
    
},
{ 
    timestamps: true
});

export default mongoose.model('Category', category);