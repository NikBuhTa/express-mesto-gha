const hdlError = (res, e, errPhr) => {
  if (e.message == errPhr) {
    res.status(404).send({message : errPhr})
  } else {
    res.status(500).send({message: e.message})
  }
}

// const hdlErrorIncData = (res, e, errPhr) => {
//   if (e.message == errPhr) {
//     res.status(400).send({message : errPhr})
//   } else {
//     res.status(500).send({message: e.message})
//   }
// }

const mkError = (errPhr) => {
  throw new Error(errPhr);
}

module.exports ={
  hdlError,
  mkError,
}
// User.findById(id)
//     .orFail(() => {
//       throw new Error('notFound');
//     })
//     .then(user => res.status(201).send({ data: user }))
//     .catch(err => {
//       console.log('err =>', err)
//       if (err.message == 'notFound') {
//         res.status(404).send({message: 'User not found'});
//       } else {
//         res.status(500).send({message: err.message});
//       }
//     });