import { ITask, IValidate } from '../../interfaces';
import { newTaskSchema } from './schemas';

export default (task: ITask): IValidate => {
    const { error } = newTaskSchema.validate(task);
    if (error) return { type: 'BAD_REQUEST', message: 'Some values are missing' };
    return { type: null, message: '' };
}