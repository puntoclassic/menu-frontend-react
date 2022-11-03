FROM "node"
WORKDIR /var/www/frontend
COPY ./ ./
RUN ["yarn","install","global","serve"]
RUN ["yarn","install"]
RUN ["yarn","build"]
CMD ["serve","build"]