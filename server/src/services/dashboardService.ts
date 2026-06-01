import { Status } from '@prisma/client';
import dashboardRepository from "../repositories/dashboardRepository";


class   dashboardService { 

    async getSummary(){
       const [
            totalBooks, 
            activeLoans, 
            overdueLoans, 
            booksByCategory, 
            latestLoansRaw
        ] = await Promise.all([
            dashboardRepository.countTotalBooks(),
            dashboardRepository.countActiveLoans(),
            dashboardRepository.countOverdueLoans(),
            dashboardRepository.groupByLivros(),
            dashboardRepository.findLatestLoans()
        ]);

        const latestLoans = latestLoansRaw.map(emprestimo => {
            let statusDinamico = 'Em_andamento';

            if(emprestimo.status === Status.Devolvido){
                statusDinamico = 'Devolvido';
            }
            else if(new Date(emprestimo.data_prevista_devolucao) < new Date()){
                statusDinamico = 'Atrasado';
            }

            return {
            id: emprestimo.id,
            livro: emprestimo.livro.titulo,
            nome_cliente: emprestimo.nome_cliente,
            email_cliente: emprestimo.email_cliente,
            status: statusDinamico,
            data_locacao: emprestimo.data_locacao,
            data_prevista_devolucao: emprestimo.data_prevista_devolucao,
        };
    });

    return {
        metrics: { totalBooks, activeLoans, overdueLoans },
        booksByCategory,
        latestLoans
    };
    }
} 

export  default new dashboardService();