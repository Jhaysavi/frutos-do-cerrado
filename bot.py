import logging
import requests
from telegram import Update, InputFile
from telegram.ext import Application, CommandHandler, MessageHandler, Filters, CallbackContext

# Armazenamento de log de erros
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    level=logging.INFO)
logger = logging.getLogger(__name__)

# Puxar os eventos no nosso repositório do GitHub
def get_events():
    github_raw_url = "https://raw.githubusercontent.com/FrozenKeyboard/FrutosdoCerrado/main/calendário.json"
    
    try:
        response = requests.get(github_raw_url)
        response.raise_for_status()  # Verifica se houve erros na requisição
        events = response.json()
        
        # Estrutura do calendário
        #     {"name": "Evento A", "date": "2024-12-01", "description": "Descrição do evento A"},
        #     {"name": "Evento B", "date": "2024-12-03", "description": "Descrição do evento B"},
        # ]
        
        return events
    except requests.exceptions.RequestException as e:
        return []
    except ValueError:
        return []


# Comando /Calendário
def calendario(update: Update, context: CallbackContext):
    events = get_events()
    if events:
        message = "Próximos eventos:\n"
        for event in events:
            message += f"{event['name']} em {event['date']}: {event['description']}\n"
    else:
        message = "Não há eventos nos próximos 7 dias."
    update.message.reply_text(message)

# Comando /Mapa
def mapa(update: Update, context: CallbackContext):
    update.message.reply_text("Quais informações específicas você gostaria sobre o mapa?")
    update.message.reply_photo(photo=open('arquivo1_mapa.jpg', 'rb'))

# Comando /Marketplace
def marketplace(update: Update, context: CallbackContext):
    update.message.reply_text("A funcionalidade do Marketplace ainda está sendo construída.")
    # Em construção por aqui ainda

# Comando /Biblioteca
    # Ainda precisa definir de onde vamos puxar os treinamentos
    # Adicionar função para o usuário solicitar novo treinamento
def biblioteca(update: Update, context: CallbackContext):
    trainings = [
        "Treinamento sobre Cultura e Costumes Locais",
        "Como Lidar com a Seca",
        "Controle de Foco de Incêndios",
        "Treinamento sobre Agricultura Sustentável",
        "Criação de Sisterna Caseira",
        "História e Cultura dos Quilombos",
    ]
    message = "Lista dos treinamentos disponíveis:\n" + "\n".join(trainings)
    update.message.reply_text(message)

# Comando /Clima
def clima(update: Update, context: CallbackContext):
    update.message.reply_text("Qual é a sua cidade em Goiás?")
    return 'CIDADE'

# Função para obter informações de clima usando wttr.in
def get_weather(city):
    url = f"https://wttr.in/{city.replace(' ', '+')}?format=%C+%t"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            return response.text
        else:
            return "Não foi possível obter as informações de clima no momento."
    except requests.exceptions.RequestException as e:
        return f"Erro ao acessar o serviço de clima: {str(e)}"

# Função para processar o clima
def process_clima(update: Update, context: CallbackContext):
    city = update.message.text
    weather_info = get_weather(city)
    update.message.reply_text(f"Clima em {city}: {weather_info}")

# Comando /start
def start(update: Update, context: CallbackContext):
    update.message.reply_text(
        "Olá! Bem-vindo aos Frutos do Cerrad!.\n"
        "/Calendário: Para próximos eventos em Goiás\n"
        "/Mapa: Para obter informações sobre o mapa\n"
        "/Marketplace: Para saber sobre o marketplace (em construção)\n"
        "/Biblioteca: Lista de treinamentos locais\n"
        "/Clima: Para saber sobre o clima na sua cidade"
    )

# Mensagens desconhecidas
def unknown(update: Update, context: CallbackContext):
    update.message.reply_text("Em que posso lhe ajudar hoje?")

# Comandos principais
def main():
    token = "7248254426:AAEr_iCFhTR_opVv_8G7s4ORBA_xaRvuAYU"
    application = Application.builder().token(token).build()

    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("Calendário", calendario))
    application.add_handler(CommandHandler("Mapa", mapa))
    application.add_handler(CommandHandler("Marketplace", marketplace))
    application.add_handler(CommandHandler("Biblioteca", biblioteca))
    application.add_handler(CommandHandler("Clima", clima))

    # Handler e polling
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, unknown))
    application.run_polling()

if __name__ == '__main__':
    main()
