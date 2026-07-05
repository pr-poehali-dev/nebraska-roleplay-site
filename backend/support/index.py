import json
import os
import smtplib
from email.mime.text import MIMEText
from email.header import Header


def handler(event: dict, context) -> dict:
    '''
    Business: Принимает обращение из формы поддержки и отправляет его на почту администрации.
    Args: event - dict с httpMethod, body (nickname, message); context - объект с request_id
    Returns: HTTP-ответ со статусом отправки
    '''
    method = event.get('httpMethod', 'GET')

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    body = json.loads(event.get('body') or '{}')
    nickname = (body.get('nickname') or '').strip()
    message = (body.get('message') or '').strip()

    if not nickname or not message:
        return {
            'statusCode': 400,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Заполните ник и сообщение'}),
        }

    host = os.environ.get('SMTP_HOST')
    port = int(os.environ.get('SMTP_PORT', '465'))
    user = os.environ.get('SMTP_USER')
    password = os.environ.get('SMTP_PASSWORD')
    support_email = os.environ.get('SUPPORT_EMAIL')

    text = f'Новое обращение с сайта NEBRASKA RP\n\nНик игрока: {nickname}\n\nСообщение:\n{message}'
    msg = MIMEText(text, 'plain', 'utf-8')
    msg['Subject'] = Header(f'Обращение от {nickname} — NEBRASKA RP', 'utf-8')
    msg['From'] = user
    msg['To'] = support_email

    with smtplib.SMTP_SSL(host, port) as server:
        server.login(user, password)
        server.sendmail(user, [support_email], msg.as_string())

    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'body': json.dumps({'success': True, 'message': 'Обращение отправлено'}),
        'isBase64Encoded': False,
    }
