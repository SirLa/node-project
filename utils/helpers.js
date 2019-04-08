import config from '../config/config';

export function doesUserExist(user) {
    return JSON.stringify(user) === JSON.stringify(config);
};