FROM nginx

COPY container / 
COPY build /usr/share/nginx/html

ENV REACT_APP_API_KEY 'KeyA20222023'

CMD /bin/bash -c "envsubst '\$REACT_APP_API_KEY' < /etc/nginx/nginx.template > /etc/nginx/nginx.conf &&  nginx -g 'daemon off;'"