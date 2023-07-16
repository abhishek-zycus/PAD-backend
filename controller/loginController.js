export const postLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, err: errors.array() });
    }

    if (req.user) {
      return res.status(200).json({
        success: true,
        user: req.user,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
