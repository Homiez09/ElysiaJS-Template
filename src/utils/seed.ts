import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main()
{
    await prisma.user.create({
        data:
        {
            name: "Phumrapee Soenvanichakul",
            email: `phum-${Math.random()}@example.com`
        },
    })

    const count = await prisma.user.count()

    console.log(`There are ${count} users in the database.`)
}

main()
    .then(async () => {
        console.log("done!")
        await prisma.$disconnect()
    })
    .catch(async (error) => {
        console.error(error)
        await prisma.$disconnect()
        process.exit(1)
    })