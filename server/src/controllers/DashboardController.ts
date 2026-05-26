import dashboardService from "../services/dashboardService";
import { Request, Response } from "express";

class dashboardController {
    async get(req: Request, res: Response) {
        try{
            const metrics = await dashboardService.getSummary();
            return res.status(200).json(metrics);
        }
        catch(error){
            console.error("Erro no Dashboard Controller:", error);
            return res.status(500).json({ 
        message: "Ocorreu um erro ao processar os dados do dashboard." });
        }
    }
}
export default new dashboardController();