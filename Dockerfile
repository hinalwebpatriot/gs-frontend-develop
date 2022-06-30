FROM keymetrics/pm2:12-stretch

ENV ENVIRONMENT=development

COPY . /opt/app/

WORKDIR /opt/app

EXPOSE 3000

CMD ["sh", "-c", "pm2-runtime start ecosystem.config.js --env ${ENVIRONMENT}"]


