import  prisma  from  '@database';
import { Status } from '@prisma/client'

// para contar o total de livros
async function countTotalBooks(): Promise<number> {
    return await prisma.livro.count();
}

// para contar o total de empréstimos ativos
async function countActiveLoans(): Promise<number>{
    return await prisma.emprestimo.count({  
        where: {
            status: {
                not: Status.Devolvido,
            }
        }
    });
}

// para contar o total de empréstimos atrasados
async function countOverdueLoans(): Promise<number>{
    return await prisma.emprestimo.count({
        where: {
            status: {
                not: Status.Devolvido,
            },
            data_prevista_devolucao: {
                lt: new Date(),
            }
        }
    });
}

//agrupamento 

async function groupByLivros(){
    return await prisma.livro.groupBy({
        by: ['categoria'],
        _count: {
            id: true,
        }
    });
}

async function findLatestLoans(): Promise<any[]> {
    return await prisma.emprestimo.findMany({
        take: 5,
        orderBy: {
            data_locacao: 'desc',
        },
        include: {
            livro:{
                select: {
                    titulo: true, //para selecionar só o titulo do livro
                }
            }
        }
    });
}

export default {
    countTotalBooks,
    countActiveLoans,
    countOverdueLoans,
    groupByLivros,
    findLatestLoans,
}   