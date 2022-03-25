exports.getIndexPage = async (req, res) => {
  res.status(200).render('index', {
    page_active: 'index',
  });
};
