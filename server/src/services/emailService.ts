import nodemailer from "nodemailer";

//transporter usado como "carteiro", faz o login no email e fica pronto para enviar os email
const transporter = nodemailer.createTransport({
  //servidor do email
  host: process.env.SMTP_HOST,

  //porta de comunicação
  port: Number(process.env.SMTP_PORT),

  //false para porta 587
  secure: false,

  //suas credenciais
  auth: {
    user: process.env.SMTP_USER, //email
    pass: process.env.SMTP_PASS, //senha de app
  },
});

//tipagem dos dados que a função vai receber
interface DadosLembrete {
  email_cliente: string; //email do cliente
  nome_cliente: string; //nome do cliente
  nome_livro: string; //nome do livro
  data_locacao: Date; //data da locação
  data_prevista_devolucao: Date; //data prevista para devolução
}

//função que monta e envia o email de lembrete
export async function enviarLembrete(dados: DadosLembrete) {
  //monta o html do email
  const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head><meta charset="UTF-8"></head>
    <body style="margin:0;padding:0;background-color:#fef2f2;font-family:system-ui,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fef2f2;padding:32px 16px;">
        <tr>
        <td align="center">
            <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            
            <!-- Cabeçalho -->
            <tr>
                <td style="background:linear-gradient(135deg,#dc2626,#ea580c);padding:32px 40px;text-align:center;">
                <p style="font-size:40px;margin:0 0 4px;">📚</p>
                <h1 style="color:#fff;font-size:24px;font-weight:700;margin:0;letter-spacing:0.5px;">BIBLIOTECA ESCOLAR</h1>
                </td>
            </tr>
            
            <!-- Corpo -->
            <tr>
                <td style="padding:32px 40px;">
                
                <!-- Tag de status -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                    <tr>
                    <td>
                        <span style="display:inline-block;background:#fee2e2;color:#dc2626;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;text-transform:uppercase;">
                        ⚠️ Livro em Atraso
                        </span>
                    </td>
                    </tr>
                </table>
                
                <h2 style="color:#111827;font-size:20px;font-weight:600;margin:0 0 8px;">${dados.nome_cliente}, atenção!</h2>
                <p style="color:#6b7280;font-size:15px;line-height:1.6;margin:0 0 24px;">
                    O livro abaixo já deveria ter sido devolvido à biblioteca. Regularize sua situação o quanto antes.
                </p>
                
                <!-- Card do livro -->
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#fee2e2;border-left:4px solid #dc2626;border-radius:8px;margin-bottom:24px;">
                    <tr>
                    <td style="padding:16px 20px;">
                        <p style="color:#6b7280;font-size:11px;font-weight:600;margin:0 0 4px;text-transform:uppercase;">📖 Livro</p>
                        <p style="color:#111827;font-size:18px;font-weight:600;margin:0;">${dados.nome_livro}</p>
                    </td>
                    </tr>
                </table>
                
                <!-- Datas -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                    <tr>
                    <td width="50%" style="padding-right:12px;">
                        <p style="color:#9ca3af;font-size:12px;margin:0 0 4px;">📅 Empréstimo</p>
                        <p style="color:#374151;font-size:15px;font-weight:500;margin:0;">${dados.data_locacao.toLocaleDateString("pt-BR")}</p>
                    </td>
                    <td width="50%" style="padding-left:12px;">
                        <p style="color:#9ca3af;font-size:12px;margin:0 0 4px;">📅 Deveria devolver em</p>
                        <p style="color:#dc2626;font-size:15px;font-weight:700;margin:0;">${dados.data_prevista_devolucao.toLocaleDateString("pt-BR")}</p>
                    </td>
                    </tr>
                </table>
                
                </td>
            </tr>
            
            <!-- Rodapé -->
            <tr>
                <td style="background:#f9fafb;padding:20px 40px;text-align:center;border-top:1px solid #e5e7eb;">
                <p style="color:#374151;font-size:13px;font-weight:600;margin:0;">
                    📚 Biblioteca Escolar
                </p>
                <p style="color:#9ca3af;font-size:12px;margin:4px 0 0;">
                    Email automático. Não responda.
                </p>
                </td>
            </tr>
            
            </table>
        </td>
        </tr>
    </table>
    </body>
    </html>
    `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM, //remetente
    to: dados.email_cliente, //destinatário
    subject: `📚 Lembrete de Devolução - ${dados.nome_livro}`, //assunto
    html, //corpo do email em html
  });
}
