import { getRepository } from 'typeorm';
import User from '../Models/Typeorm/User.entity';

const checkAccess = async (userId: number, doorId: number) => {
  let hasAccess = false;
  try {
    const { group } = await getRepository(User).findOne(userId, {
      relations: [
        'group',
        'group.doors',
      ],
    });
    group.doors.forEach((door) => {
      if (door.did === doorId) hasAccess = true;
    });
    return hasAccess;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default checkAccess;
