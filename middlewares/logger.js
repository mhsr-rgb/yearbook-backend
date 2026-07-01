export default function logger(req, res, next) {
  const agora = new Date().toISOString();
  const metodo = req.method;
  const url = req.originalUrl;

  console.log(`[${agora}] ${metodo} ${url}`);

  next();
}