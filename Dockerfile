ARG NODE_IMAGE=node:18-alpine
ARG PORT=3000
# Stage 1: Dependências para desenvolvimento
FROM ${NODE_IMAGE} AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json ./
RUN npm install

# Instala o Prisma globalmente no contêiner
RUN npm install -g prisma

# RUN npx prisma init
# RUN npx prisma migrate dev --name create_migrations

# Stage 2: Build e dependências para produção
FROM deps AS builder
COPY . .

RUN prisma generate
# RUN prisma migrate dev

ENV NEXT_TELEMETRY_DISABLED 1


# Modo de desenvolvimento - comando para iniciar o servidor de desenvolvimento
CMD ["npm", "run", "dev"]

# Stage 3: Imagem final otimizada para produção
FROM ${NODE_IMAGE} AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# Define as permissões adequadas para o diretório do aplicativo
RUN chown -R nextjs:nodejs /app

COPY  --chown=node:node --from=builder /app/.next ./.next
COPY  --chown=node:node --from=builder /app/package.json ./package.json

EXPOSE ${PORT}

# Modo de produção - comando para iniciar o servidor otimizado para produção
CMD ["npm", "start"]
