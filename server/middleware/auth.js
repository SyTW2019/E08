const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next){
  console.log('Valores del req');
  console.log(req.header('x-auth-token'));
  console.log('Done');
  const token = req.header('x-auth-token');

  if(!token) {res.status(401).json({ msg: 'No hay token, operación no válida' })};

  try{
    const descod = jwt.verify(token, config.get('jwtSecret'));
    req.user = descod;
    next();
  }
  catch(e){
    res.status(400).json({ msg: 'El token no es válido' });
  }
}

module.exports = auth;
