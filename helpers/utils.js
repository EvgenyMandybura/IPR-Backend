const createUser = async ({ firstName, lastName, email, password }) => {
  return await db.User.create({ firstName, lastName, email, password });
};

const getAllUsers = async () => {
  return await db.User.findAll();
};

const getUser = async (obj) => {
  return await db.User.findOne({
    where: obj,
  });
};
