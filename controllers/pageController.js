exports.getIndexPage = async (req, res) => {
  res.status(200).render('index', {
    page_active: 'index',
  });
};

exports.getDebtPage = async (req, res) => {
  res.status(200).render('list-debt', {
    page_active: 'index',
  });
};

exports.getDebtAddPage = async (req, res) => {
  res.status(200).render('add-debt', {
    page_active: 'index',
  });
};

exports.getMedicineAddPage = async (req, res) => {
  res.status(200).render('add-medicine', {
    page_active: 'index',
  });
};

