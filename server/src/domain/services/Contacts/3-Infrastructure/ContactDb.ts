import mongoose, { Document, Model } from 'mongoose';
const { Schema } = mongoose;

export interface IContactDB
  extends Document<{
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  }> {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

const contactSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  firstName: String,
  lastName: String,
  email: String,
  phone: String
});

const ContactDb = mongoose.model<IContactDB>('Contact', contactSchema);

export default ContactDb;
