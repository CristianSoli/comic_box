const { Router } = require('express');
const router = Router();

router.get('/test', (req, res) => {
    const data = {
        "name": 'John',
        "website": "cristian.com"
    };
    res.json(data);

});

module.exports = router;