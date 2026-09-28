#! /bin/bash
echo '################CARGANDO NOMBRES DE IMAGENES#################'
sleep 2

export version_front="reddebjsh/jornadas2025:front-1.0.0"


echo '################TERMINADO#################'
sleep 1

echo '################CONSTRUYENDO NGINX DE FRONTEND#################'
sleep 2
docker buildx build -f Dockerfile -t "$version_front" --cache-from type=registry,ref=$version_front --cache-to type=inline --push .
echo '################TERMINADO#####################################'
sleep 1
