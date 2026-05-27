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
            let statusDinamico = 'Em andamento';

            if(emprestimo.status === Status.Devolvido){
                statusDinamico = 'Devolvido';
            }
            else if(new Date(emprestimo.data_prevista_devolucao) < new Date()){
                statusDinamico = 'Atrasado';
            }

            return {
            id: emprestimo.id,
            livro: emprestimo.livro.titulo,
            status: statusDinamico,
            data: emprestimo.data_locacao,
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