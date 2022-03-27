exports.getIndexPage = async (req, res) => {
  res.status(200).render('index', {
    page_active: 'index',
  });
};

exports.getBorcPage = async (req, res) => {
  res.status(200).render('list', {
    page_active: 'index',
  });
};

