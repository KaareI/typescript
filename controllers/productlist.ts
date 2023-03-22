import { Request, Response, Router } from "express";
import Toode from "../models/Toode";

const router: Router = Router();

const tooted: Toode[] = [
    new Toode(1,"Koola", 1.5, true),
    new Toode(2,"Fanta", 1.0, false),
    new Toode(3,"Sprite", 1.7, true),
    new Toode(4,"Vichy", 2.0, true),
    new Toode(5,"Vitamin well", 2.5, true)
];

router.get("/tooted", (req: Request, res: Response) => {
    res.send(tooted)
});

router.delete("/kustuta-toode/:index", (req: Request, res: Response) => {
    if (/^[0-9]+$/.test(req.params.index)) {
    tooted.splice(Number(req.params.index),1)
    res.send(tooted)
    } else {
        res.send("Toode kustutamine ei õnnestunud, sisesta number!");
    }

});

router.delete("/kustuta-toode-variant2/:index", (req: Request, res: Response) => {
    if (/^[0-9]+$/.test(req.params.index)) {
        tooted.splice(Number(req.params.index), 1)
        res.send("Toode kustutatud!")
    }
    else {
            res.send("Toode kustutamine ei õnnestunud, sisesta number!");
        }
});

router.post("/lisa-toode/:id/:nimi/:hind/:aktiivne", (req: Request, res: Response) => {
    if (/^[0-9]+$/.test(req.body.id) && /^[0-9]+$/.test(req.body.price)) {
        tooted.push(
            new Toode(req.body.id, req.body.name, req.body.price, req.body.isActive)
        )
    }
    res.send(tooted)
});

router.patch("/hind-dollaritesse/:kurss", (req: Request, res: Response) => {
    for (let index = 0; index < tooted.length; index++) {
        tooted[index].price = tooted[index].price * Number(req.params.kurss);
    }
    res.send(tooted)
});

router.delete("/kustuta-tooted", (req: Request, res: Response) => {
    if (/^[0-9]+$/.test(req.params.kurss)) {
    tooted.splice(0, tooted.length);
    res.send("Kõik tooted on kustutatud!");
    } else {
        res.send("Toodete kustutamine ei õnnestunud");
    }
});

router.put("/muuda-toodete-aktiivsust", (req: Request, res: Response) => {
    if (/^[0-9]+$/.test(req.params.kurss)) {
    tooted.forEach((toode) => {
        if(toode.isActive === true) {
            toode.isActive = !toode.isActive;
        }
    });
    res.send("Kõikide toodete aktiivsus on muudetud!");}
    else {
            res.send("Toodete aktiivsuse muutmine ei õnnestunud");
        }
});

router.get("/toode/:id", (req: Request, res: Response) => {
    if (/^[0-9]+$/.test(req.params.kurss)) {
        const id = Number(req.params.id);
        const toode = tooted[id];
        if (toode) {
            res.send(toode);
        } else {
            res.status(404).send("Sellist toodet ei leitud!");
        }
    } else {
        res.status(404).send("Viga toote kuvamisel");
    }
});

router.get("/suurim-hind", (req: Request, res: Response) => {
    if (/^[0-9]+$/.test(req.params.kurss)) {
    let suurimHind = 0;
    let suurimaHinnagaToode = null;
    tooted.forEach((toode) => {
        if (toode.price > suurimHind) {
            suurimHind = toode.price;
            suurimaHinnagaToode = toode;
        }
    });
    if (suurimaHinnagaToode) {
        res.send(suurimaHinnagaToode);
    } else {
        res.status(404).send("Tooteid ei leitud!");
    }
    } else {
        res.status(404).send("Viga toote kuvamisel");
    }
});

export default router;