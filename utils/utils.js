const secretKey = 'acd264eeece9a981302f9530c9be556d8e8b50db74063a37a2653153cf6db726';

const handleError = (res, e, errPhr) => {
  if (e.message === errPhr) {
    res.status(404).send({ message: errPhr });
  } else {
    res.status(500).send({ message: e.message });
  }
};

const makeError = (errPhr) => {
  throw new Error(errPhr);
};

module.exports = {
  handleError,
  makeError,
  secretKey,
};
