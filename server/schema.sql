-- Tabela para armazenar as leituras e interpretações
-- Execute este SQL no "SQL Editor" do seu painel Supabase

create type reading_status as enum ('PENDING', 'PAID', 'DELIVERED');

create table public.readings (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_email text not null,
  user_name text,
  user_phone text,
  question text,
  cards_json jsonb not null, -- IDs e posições das cartas
  status reading_status default 'PENDING',
  interpretation jsonb, -- Resultado gerado pela IA (Cache)
  stripe_session_id text -- ID da sessão de pagamento (opcional)
);

-- Habilitar Row Level Security (RLS) para segurança
alter table public.readings enable row level security;

-- Política: O backend (service_role) pode fazer tudo.
-- Se formos acessar do frontend, precisaremos de políticas de SELECT baseadas no ID da leitura.
create policy "Enable all access for service role" on public.readings
    as permissive for all
    to service_role
    using (true)
    with check (true);

-- (Opcional) Política de leitura pública para usuários com o ID da leitura
create policy "Allow public read by ID" on public.readings
    for select
    to public
    using (true);
