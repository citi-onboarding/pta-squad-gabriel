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
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: 'Inter', system-ui, -apple-system, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 32px 16px;">
        <tr>
        <td align="center">
            <!-- Card -->
            <table width="560" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);">
            <!-- Header -->
            <tr>
                <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 32px 40px; text-align: center;">
                <p style="font-size: 36px; margin: 0 0 8px;">📚</p>
                <h1 style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0; letter-spacing: -0.025em;">Biblioteca EJ</h1>
                </td>
            </tr>
            
            <!-- Body -->
            <tr>
                <td style="padding: 32px 40px;">
                
                <h2 style="color: #111827; font-size: 20px; font-weight: 600; margin: 0 0 8px;">
                    Olá, ${dados.nome_cliente}!
                </h2>
                
                <p style="color: #6b7280; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
                    Seu livro está quase na data de devolução. 
                    Dá uma olhada nas informações:
                </p>
                
                <!-- Card do livro -->
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #eef2ff; border-left: 4px solid #6366f1; border-radius: 8px; margin-bottom: 24px;">
                    <tr>
                    <td style="padding: 16px 20px;">
                        <p style="color: #6b7280; font-size: 11px; font-weight: 600; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.05em;">Livro Emprestado</p>
                        <p style="color: #111827; font-size: 18px; font-weight: 600; margin: 0;">${dados.nome_livro}</p>
                    </td>
                    </tr>
                </table>
                
                <!-- Datas -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                    <tr>
                    <td width="50%" style="padding-right: 12px;">
                        <p style="color: #9ca3af; font-size: 12px; margin: 0 0 4px;">Data do Empréstimo</p>
                        <p style="color: #374151; font-size: 15px; font-weight: 500; margin: 0;">${dados.data_locacao.toLocaleDateString("pt-BR")}</p>
                    </td>
                    <td width="50%" style="padding-left: 12px;">
                        <p style="color: #9ca3af; font-size: 12px; margin: 0 0 4px;">Devolução Prevista</p>
                        <p style="color: #374151; font-size: 15px; font-weight: 500; margin: 0;">${dados.data_prevista_devolucao.toLocaleDateString("pt-BR")}</p>
                    </td>
                    </tr>
                </table>
                
                <!-- Alerta -->
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef9c3; border-radius: 8px; margin-bottom: 32px;">
                    <tr>
                    <td style="padding: 14px 20px;">
                        <p style="color: #854d0e; font-size: 14px; font-weight: 500; margin: 0;">
                        ⚠️ Devolva o livro até a data prevista para evitar multas.
                        </p>
                    </td>
                    </tr>
                </table>
                
                <!-- Botão -->
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                    <td align="center">
                        <a href="#" style="display: inline-block; background-color: #6366f1; color: #ffffff; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-weight: 600; font-size: 15px;">
                        Ver Meus Empréstimos
                        </a>
                    </td>
                    </tr>
                </table>
                </td>
            </tr>
            <!-- Footer -->
            <tr>
                <td style="background-color: #f3f4f6; padding: 20px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                    Biblioteca EJ • Empresa Júnior
                </p>
                <p style="color: #d1d5db; font-size: 11px; margin: 6px 0 0;">
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
