exports.getIndexPage = async (req, res) => {
  res.status(200).render('index');
};

exports.getDebtPage = async (req, res) => {
  res.status(200).render('list-debt');
};

exports.getDebtAddPage = async (req, res) => {
  res.status(200).render('add-debt');
};

exports.getMedicineAddPage = async (req, res) => {
  res.status(200).render('add-medicine');
};

