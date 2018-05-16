const got = require("got");
const express = require("express");
const app = express();

const { PORT = 8080, OLD_DOMAIN, NEW_DOMAIN } = process.env;

app.get("/:id?", async (req, res) => {
    const { id } = req.params;
    let domain;

    try {
        await got(`https://${NEW_DOMAIN}/${id}`); // Throws an error on 404
        domain = NEW_DOMAIN;
    }
    catch(e) {
        domain = OLD_DOMAIN;
    }

    res.redirect(`https://${domain}/${id}`);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});