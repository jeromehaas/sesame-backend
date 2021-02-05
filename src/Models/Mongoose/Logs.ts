import {
  model, Schema, Document,
} from 'mongoose';

interface Log {
  enteredBy: string;
  enteredDoor: Number;
  date: Date;
}

const logSchema = new Schema({
  enteredBy: { type: String, required: true },
  enteredDoor: { type: Number, required: true  },
  date: { type: String, required: false, default: new Date().toLocaleDateString()},
});

const logModel = model<Log & Document>('Logs', logSchema);

export default logModel;
