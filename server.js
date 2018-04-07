const got = require("got");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;
const OLD_DOMAIN = process.env.OLD_DOMAIN || "goo.gl";
const NEW_DOMAIN = process.env.NEW_DOMAIN || "ifvr.co";

app.get("/:id?", async (req, res) => {
    const id = req.params.id;
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