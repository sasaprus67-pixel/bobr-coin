import telebot

# Твій токен (Я ВЖЕ ПРИБРАВ ПРОБІЛ, ПРОСТО СКОПІЮЙ)
TOKEN = "8686184304:AAGOY0h3cGUaCwMDV-LllrknNZlVrzEBqFk"

bot = telebot.TeleBot(TOKEN)

@bot.message_handler(commands=['start'])
def start(message):
    bot.send_message(message.chat.id, "Бобер на зв'язку! 🦫\nНапиши мені щось, щоб отримати монету!")

@bot.message_handler(func=lambda message: True)
def tap(message):
    bot.reply_to(message, "Ти тапнув Бобра! +1 монета 🪙")

print("Бобер вийшов на зміну! Бот працює...")
bot.infinity_polling()
