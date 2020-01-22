const config = require('config');   //para almacenar el jwtsecret y la uri de mongo
const jwt = require('jsonwebtoken');

//Función de validación del token
function auth(req, res, next){
  // console.log('Valores del req');
  // console.log(req.header('x-auth-token'));
  // console.log('Done');

  //el token viene en un header
  const token = req.header('x-auth-token');

  //si no hay token, se envía un error
  if(!token) {res.status(401).json({ msg: 'No hay token, operación no válida' })};

  //si se puede descodificar el token y comprobar que es igual al id, es válido
  try{
    const descod = jwt.verify(token, config.get('jwtSecret'));
    req.user = descod;
    next();
  }
  catch(e){ //si no, damos error de que el token no vale
    res.status(400).json({ msg: 'El token no es válido' });
  }
}

module.exports = auth;
