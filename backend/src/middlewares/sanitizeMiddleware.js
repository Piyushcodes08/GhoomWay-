/**
 * Custom NoSQL Injection Sanitizer — Express 5 Compatible
 * 
 * Replaces `express-mongo-sanitize` which is incompatible with Express 5
 * because it tries to overwrite read-only properties like req.query.
 * 
 * This middleware strips keys starting with '$' or containing '.' from req.body,
 * which are the primary vectors for NoSQL injection attacks.
 */

const sanitize = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;

  for (const key of Object.keys(obj)) {
    if (key.startsWith('$') || key.includes('.')) {
      delete obj[key];
    } else {
      obj[key] = sanitize(obj[key]);
    }
  }
  return obj;
};

const mongoSanitizeMiddleware = (req, _res, next) => {
  if (req.body) {
    req.body = sanitize(JSON.parse(JSON.stringify(req.body)));
  }
  next();
};

module.exports = mongoSanitizeMiddleware;
