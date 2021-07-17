import { SiteClient } from "datocms-client";

export default async function recebedorDeRequests(req, res) {
    if (req.method === "POST") {
        const TOKEN = "06c7a1f371903831949f76ca0e263e";
        const client = new SiteClient(TOKEN);

        const registroCriado = await client.items.create({
            itemType: "967994",
            ...req.body,
            // title: "Comunidade Teste",
            // imageUrl: "https://github.com/Augusto-Neves.png",
            // creatorSlug: "Augusto-Neves",
        })

        console.log(registroCriado);

        res.json({
            dados: "Um dado teste",
            registroCriado: registroCriado,
        })

        return;
    }

    res.status(404).json({
        message: "Ainda não há dados no GET, mas no POST tem"
    })
}