/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import pino from 'pino';
import { getRepository } from 'typeorm';
import Group from '../../Models/Typeorm/Group.entity';
import Door from '../../Models/Typeorm/Door.entity';

const logger = pino({
  prettyPrint: true,
});

const getGroups = async (req: Request, res: Response) => {
  try {
    const groups = await getRepository(Group).find({
      relations: ['doors'],
    });
    res.status(200).send(groups);
  } catch (error) {
    console.log(error);
    res.send(500);
  }
};

const updateGroup = async (req: Request, res: Response) => {
  const gid: number = Number(req.params.id);
  const { doors } = req.body;
  try {
    //get existing group entity
    //check if doors are updated, add if needed (idk how to delete? maybe replace entire array each time)
    //update values
    await getRepository(Group).update({ gid }, req.body);
    const updatedGroup: Group = await getRepository(Group).findOne(req.params.id);
    res.send(updatedGroup);
  } catch (error) {
    console.log(error);
    res.send(500);
  }
};

const createGroup = async (req: Request, res: Response) => {
  const {
    doors,
    groupName,
    description,
    accessFromHour,
    accessToHour,
  } = req.body;
  const formattedBody = {
    groupName,
    description,
    accessFromHour,
    accessToHour,
  };
  try {
    const newGroup: Group = getRepository(Group).create(formattedBody);
    if (doors.length) {
      const doorEntities: Door[] = await getRepository(Door).findByIds(doors);
      newGroup.doors = doorEntities;
    }
    await getRepository(Group).save(newGroup);
    newGroup.doors = doors;
    res.status(200).send(newGroup);
  } catch (error) {
    console.log(error);
    res.send(500);
  }
};

const deleteGroup = async (req: Request, res: Response) => {
  try {
    const deletedGroup = getRepository(Group).findOne(req.params.id);
    await getRepository(Group).delete(req.params.id);
    res.send(deletedGroup);
  } catch (error) {
    console.log(error);
    res.send(500);
  }
};

export {
  createGroup,
  getGroups,
  deleteGroup,
  updateGroup,
};
