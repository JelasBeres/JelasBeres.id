sudo sed -i '/location \/ {/i \    location /uploads/ {\n        alias /home/jelas-beres/jelasberes.id/public/uploads/;\n        access_log off;\n        expires max;\n    }\n' /etc/nginx/sites-available/jelasberes.id
sudo nginx -t && sudo systemctl reload nginx
