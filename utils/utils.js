const hdlError = (res, e, errPhr) => {
  if (e.message === errPhr) {
    res.status(404).send({ message: errPhr });
  } else {
    res.status(500).send({ message: e.message });
  }
};

// const hdlErrorIncData = (res, e, errPhr) => {
//   if (e.message == errPhr) {
//     res.status(400).send({message : errPhr})
//   } else {
//     res.status(500).send({message: e.message})
//   }
// }

const mkError = (errPhr) => {
  throw new Error(errPhr);
};

module.exports = {
  hdlError,
  mkError,
};
