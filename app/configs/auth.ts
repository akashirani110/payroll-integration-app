import jwt from 'express-jwt';

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;
  if(authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return null;
};

/**
 * In this stage,
 * the required only checks if there is a token exists then decode data
 * TODO: validate if user actually exists in DB
 */
const auth = {
  required: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    algorithms: ['HS256']
  }),
  optional: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
    algorithms: ['HS256']
  }),
};

export default auth