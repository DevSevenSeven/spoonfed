import { User } from '../models/user.js';


export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'TammyP', password: 'ilikecheese2' },
    { username: 'NovaBean', password: 'iamdog0322' },
    { username: 'HelloKitty', password: 'kuromi1104' },
  ], { individualHooks: true });
};